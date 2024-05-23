<?php

namespace Marvel\Http\Controllers;

use Barryvdh\DomPDF\Facade\Pdf as PDF;
use Dompdf\Options;
use Exception;
use Illuminate\Auth\Access\AuthorizationException;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use Maatwebsite\Excel\Facades\Excel;
use Marvel\Database\Models\DownloadToken;
use Marvel\Database\Models\Order;
use Marvel\Database\Models\Wishlist;
use Marvel\Database\Models\Addtocart;
use Marvel\Database\Models\Settings;
use Marvel\Database\Models\Product;
use Marvel\Database\Models\User;
use Marvel\Database\Repositories\OrderRepository;
use Marvel\Enums\PaymentGatewayType;
use Marvel\Enums\Permission;
use Marvel\Exceptions\MarvelException;
use Marvel\Exports\OrderExport;
use Marvel\Http\Requests\OrderCreateRequest;
use Marvel\Http\Requests\OrderUpdateRequest;
use Marvel\Traits\OrderManagementTrait;
use Marvel\Traits\PaymentStatusManagerWithOrderTrait;
use Marvel\Traits\PaymentTrait;
use Marvel\Traits\TranslationTrait;
use Marvel\Traits\WalletsTrait;
use Symfony\Component\HttpKernel\Exception\HttpException;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use Log;
use Marvel\Database\Repositories\ProductRepository;

use Marvel\Database\Models\Review;
use Marvel\Database\Repositories\RefundRepository;

class OrderController extends CoreController
{
    use WalletsTrait,
        OrderManagementTrait,
        TranslationTrait,
        PaymentStatusManagerWithOrderTrait,
        PaymentTrait;

    public OrderRepository $repository;
    public Settings $settings;
    public ProductRepository $productrepository;
    public RefundRepository $refundRepository;

    public function __construct(OrderRepository $repository, ProductRepository $productrepository, RefundRepository $refundRepository )
    {
        $this->repository = $repository;
        $this->settings = Settings::first();
        $this->productrepository = $productrepository;
        $this->refundRepository = $refundRepository;
    }

    /**
     * Display a listing of the resource.
     *
     * @param Request $request
     * @return Collection|Order[]
     */
    public function index(Request $request)
    {
        $limit = $request->limit ? $request->limit : 10;
        return $this->fetchOrders($request)->paginate($limit)->withQueryString();
    }

    /**
     * fetchOrders
     *
     * @param mixed $request
     * @return object
     */
    public function fetchOrders(Request $request)
    {
        $user = $request->user();

        if (!$user) {
            throw new AuthorizationException(NOT_AUTHORIZED);
        }

        $Orderalertupdate = User::where('id','=',$user->id)->first();
        if ($Orderalertupdate) {
            $Orderalertupdate->orderalert = 0;
            $Orderalertupdate->save();
        }

        switch ($user) {
            case $user->hasPermissionTo(Permission::SUPER_ADMIN):
                // return $this->repository->with('children')->where('id', '!=', null)->where('parent_id', '=', null);
                return $this->repository->with('children')->where('id', '!=', null);
                break;

            case $user->hasPermissionTo(Permission::STORE_OWNER):
                if ($this->repository->hasPermission($user, $request->shop_id)) {
                    return $this->repository->with('children')->where('shop_id', '=', $request->shop_id)->where('parent_id', '!=', null);
                } else {
                    $orders = $this->repository->with('children')->where('parent_id', '!=', null)->whereIn('shop_id', $user->shops->pluck('id'));
                    return $orders;
                }
                break;

            case $user->hasPermissionTo(Permission::STAFF):
                if ($this->repository->hasPermission($user, $request->shop_id)) {
                    return $this->repository->with('children')->where('shop_id', '=', $request->shop_id)->where('parent_id', '!=', null);
                } else {
                    $orders = $this->repository->with('children')->where('parent_id', '!=', null)->where('shop_id', '=', $user->shop_id);
                    return $orders;
                }
                break;

            default:
                return $this->repository->with('children')->where('customer_id', '=', $user->id)->where('parent_id', '=', null);
                break;
        }

        // ********************* Old code *********************

        // if ($user && $user->hasPermissionTo(Permission::SUPER_ADMIN) && (!isset($request->shop_id) || $request->shop_id === 'undefined')) {
        //     return $this->repository->with('children')->where('id', '!=', null)->where('parent_id', '=', null); //->paginate($limit);
        // } else if ($this->repository->hasPermission($user, $request->shop_id)) {
        //     // if ($user && $user->hasPermissionTo(Permission::STORE_OWNER)) {
        //     return $this->repository->with('children')->where('shop_id', '=', $request->shop_id)->where('parent_id', '!=', null); //->paginate($limit);
        //     // } elseif ($user && $user->hasPermissionTo(Permission::STAFF)) {
        //     //     return $this->repository->with('children')->where('shop_id', '=', $request->shop_id)->where('parent_id', '!=', null); //->paginate($limit);
        //     // }
        // } else {
        //     return $this->repository->with('children')->where('customer_id', '=', $user->id)->where('parent_id', '=', null); //->paginate($limit);
        // }
    }

    public function IsorderalertCon(Request $request){
        $user = $request->user();
        if (!$user) {
            throw new AuthorizationException(NOT_AUTHORIZED);
        }
        $Orderalertupdate = User::where('id','=',$user->id)->first();
        return ['orderalert' => $Orderalertupdate->orderalert];
    }


    /**
     * Store a newly created resource in storage.
     *
     * @param OrderCreateRequest $request
     * @return LengthAwarePaginator|\Illuminate\Support\Collection|mixed
     * @throws MarvelException
     */
    public function store(OrderCreateRequest $request)
    {   
        try {
            // decision need
            // if(!($this->settings->options['useCashOnDelivery'] && $this->settings->options['useEnableGateway'])){
            //     throw new HttpException(400, PLEASE_ENABLE_PAYMENT_OPTION_FROM_THE_SETTINGS);
            // }

            // custome codes
            foreach ($request->products as $key => $value) {
                $wonderid = Product::select('products.*', 'shops.id as shopsid', 'shops.owner_id as shopownerid')
                ->leftJoin('shops', 'shops.id', '=', 'products.shop_id')
                ->where('products.id', $value['product_id'])->first();
                
                $Orderalertupdate = User::where('id','=',$wonderid->shopownerid)->first();
                $Orderalertupdate->orderalert = 1;
                $Orderalertupdate->save();
            }
            //log::info(json_encode($request->all()));

            return DB::transaction(fn () => $this->repository->storeOrder($request, $this->settings));

        } catch (MarvelException $th) {
            throw new MarvelException(SOMETHING_WENT_WRONG, $th->getMessage());
        }
    }

    /**
     * Display the specified resource.
     *
     * @param Request $request
     * @param $params
     * @return JsonResponse
     * @throws MarvelException
     */
    public function show(Request $request, $params)
    {
        $request["tracking_number"] = $params;
        try {
            return $this->fetchSingleOrder($request);
        } catch (MarvelException $e) {
            throw new MarvelException($e->getMessage());
        }
    }

    /**
     * fetchSingleOrder
     *
     * @param mixed $request
     * @return void
     * @throws MarvelException
     */
    public function fetchSingleOrder(Request $request)
    {
        $user = $request->user() ?? null;
        $language = $request->language ?? DEFAULT_LANGUAGE;
        $orderParam = $request->tracking_number ?? $request->id;
        try {
            $order = $this->repository->where('language', $language)->with([
                'products',
                'shop',
                'children.shop',
                'wallet_point',
            ])->where('id', $orderParam)->orWhere('tracking_number', $orderParam)->firstOrFail();
        } catch (ModelNotFoundException $e) {
            throw new ModelNotFoundException(NOT_FOUND);
        }

        // Create Intent
        if (!in_array($order->payment_gateway, [
            PaymentGatewayType::CASH, PaymentGatewayType::CASH_ON_DELIVERY, PaymentGatewayType::FULL_WALLET_PAYMENT
        ])) {
            // $order['payment_intent'] = $this->processPaymentIntent($request, $this->settings);
            $order['payment_intent'] = $this->attachPaymentIntent($orderParam);
        }

        if (!$order->customer_id) {
            return $order;
        }
        if ($user && $user->hasPermissionTo(Permission::SUPER_ADMIN)) {
            return $order;
        } elseif (isset($order->shop_id)) {
            if ($user && ($this->repository->hasPermission($user, $order->shop_id) || $user->id == $order->customer_id)) {
                return $order;
            }
        } elseif ($user && $user->id == $order->customer_id) {
            return $order;
        } else {
            throw new AuthorizationException(NOT_AUTHORIZED);
        }
    }

    /**
     * findByTrackingNumber
     *
     * @param mixed $request
     * @param mixed $tracking_number
     * @return void
     */
    public function findByTrackingNumber(Request $request, $tracking_number)
    {
        $user = $request->user() ?? null;
        try {
            $order = $this->repository->with(['products', 'children.shop', 'wallet_point', 'payment_intent'])
                ->findOneByFieldOrFail('tracking_number', $tracking_number);

            if ($order->customer_id === null) {
                return $order;
            }
            if ($user && ($user->id === $order->customer_id || $user->can('super_admin'))) {
                return $order;
            } else {
                throw new AuthorizationException(NOT_AUTHORIZED);
            }
        } catch (MarvelException $e) {
            throw new MarvelException(NOT_FOUND);
        }
    }

    /**
     * Update the specified resource in storage.
     *
     * @param OrderUpdateRequest $request
     * @param int $id
     * @return JsonResponse
     */
    public function update(OrderUpdateRequest $request, $id)
    {
        try {
            $request["id"] = $id;
            return $this->updateOrder($request);
        } catch (MarvelException $e) {
            throw new MarvelException(COULD_NOT_UPDATE_THE_RESOURCE, $e->getMessage());
        }
    }

    public function updateOrder(OrderUpdateRequest $request)
    {
        return $this->repository->updateOrder($request);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param int $id
     * @return JsonResponse
     */
    public function destroy($id)
    {
        try {
            return $this->repository->findOrFail($id)->delete();
        } catch (MarvelException $e) {
            throw new MarvelException(NOT_FOUND);
        }
    }

    /**
     * Export order dynamic url
     *
     * @param Request $request
     * @param int $shop_id
     * @return string
     */
    public function exportOrderUrl(Request $request, $shop_id = null)
    {
        try {
            $user = $request->user();

            if ($user && !$this->repository->hasPermission($user, $request->shop_id)) {
                throw new AuthorizationException(NOT_AUTHORIZED);
            }

            $dataArray = [
                'user_id' => $user->id,
                'token' => Str::random(16),
                'payload' => $request->shop_id
            ];
            $newToken = DownloadToken::create($dataArray);

            return route('export_order.token', ['token' => $newToken->token]);
        } catch (MarvelException $e) {
            throw new MarvelException(SOMETHING_WENT_WRONG, $e->getMessage());
        }
    }

    /**
     * Export order to excel sheet
     *
     * @param string $token
     * @return void
     */
    public function exportOrder($token)
    {
        $shop_id = 0;
        try {
            $downloadToken = DownloadToken::where('token', $token)->first();

            $shop_id = $downloadToken->payload;
            $downloadToken->delete();
        } catch (MarvelException $e) {
            throw new MarvelException(TOKEN_NOT_FOUND);
        }

        try {
            return Excel::download(new OrderExport($this->repository, $shop_id), 'orders.xlsx');
        } catch (MarvelException $e) {
            throw new MarvelException(NOT_FOUND);
        }
    }

    /**
     * Export order dynamic url
     *
     * @param Request $request
     * @param int $shop_id
     * @return string
     */
    public function downloadInvoiceUrl(Request $request)
    {

        try {
            $user = $request->user();
            if ($user && !$this->repository->hasPermission($user, $request->shop_id)) {
                throw new AuthorizationException(NOT_AUTHORIZED);
            }
            if (empty($request->order_id)) {
                throw new NotFoundHttpException(NOT_FOUND);
            }
            $language = $request->language ?? DEFAULT_LANGUAGE;
            $isRTL = $request->is_rtl ?? false;

            $translatedText = $this->formatInvoiceTranslateText($request->translated_text);

            $payload = [
                'user_id' => $user->id,
                'order_id' => intval($request->order_id),
                'language' => $language,
                'translated_text' => $translatedText,
                'is_rtl' => $isRTL
            ];

            $data = [
                'user_id' => $user->id,
                'token' => Str::random(16),
                'payload' => serialize($payload)
            ];

            $newToken = DownloadToken::create($data);

            return route('download_invoice.token', ['token' => $newToken->token]);
        } catch (MarvelException $e) {
            throw new MarvelException($e->getMessage());
        }
    }

    /**
     * Export order to excel sheet
     *
     * @param string $token
     * @return void
     */
    public function downloadInvoice($token)
    {
        $payloads = [];
        try {
            $downloadToken = DownloadToken::where('token', $token)->firstOrFail();
            $payloads = unserialize($downloadToken->payload);
            $downloadToken->delete();
        } catch (MarvelException $e) {
            throw new MarvelException(TOKEN_NOT_FOUND);
        }

        try {
            $settings = Settings::getData($payloads['language']);
            $order = $this->repository->with(['products', 'children.shop', 'wallet_point', 'parent_order'])->where('id', $payloads['order_id'])->orWhere('tracking_number', $payloads['order_id'])->firstOrFail();

            $invoiceData = [
                'order' => $order,
                'settings' => $settings,
                'translated_text' => $payloads['translated_text'],
                'is_rtl' => $payloads['is_rtl'],
                'language' => $payloads['language'],
            ];
            $pdf = PDF::loadView('pdf.order-invoice', $invoiceData);
            $options = new Options();
            $options->setIsPhpEnabled(true);
            $options->setIsJavascriptEnabled(true);
            $pdf->getDomPDF()->setOptions($options);
            
            $filename = 'invoice-order-' . $payloads['order_id'] . '.pdf';

            return $pdf->download($filename);
        } catch (MarvelException $e) {
            throw new MarvelException(NOT_FOUND);
        }
    }

    /**
     * submitPayment
     *
     * @param mixed $request
     * @return void
     * @throws Exception
     */
    public function submitPayment(Request $request): void
    {
        $tracking_number = $request->tracking_number ?? null;
        try {
            $order = $this->repository->with(['products', 'children.shop', 'wallet_point', 'payment_intent'])
                ->findOneByFieldOrFail('tracking_number', $tracking_number);

            $isFinal = $this->checkOrderStatusIsFinal($order);
            if ($isFinal) return;

            switch ($order->payment_gateway) {

                case PaymentGatewayType::STRIPE:
                    $this->stripe($order, $request, $this->settings);
                    break;

                case PaymentGatewayType::PAYPAL:
                    $this->paypal($order, $request, $this->settings);
                    break;

                case PaymentGatewayType::MOLLIE:
                    $this->mollie($order, $request, $this->settings);
                    break;

                case PaymentGatewayType::RAZORPAY:
                    $this->razorpay($order, $request, $this->settings);
                    break;

                case PaymentGatewayType::SSLCOMMERZ:
                    $this->sslcommerz($order, $request, $this->settings);
                    break;

                case PaymentGatewayType::PAYSTACK:
                    $this->paystack($order, $request, $this->settings);
                    break;

                case PaymentGatewayType::PAYMONGO:
                    $this->paymongo($order, $request, $this->settings);
                    break;

                case PaymentGatewayType::XENDIT:
                    $this->xendit($order, $request, $this->settings);
                    break;

                case PaymentGatewayType::IYZICO:
                    $this->iyzico($order, $request, $this->settings);
                    break;

                case PaymentGatewayType::BKASH:
                    $this->bkash($order, $request, $this->settings);
                    break;

                case PaymentGatewayType::FLUTTERWAVE:
                    $this->flutterwave($order, $request, $this->settings);
                    break;
            }
        } catch (MarvelException $e) {
            throw new MarvelException(SOMETHING_WENT_WRONG, $e->getMessage());
        }
    }

    public function productAddtocart(Request $request){
        $user = $request->user();
        if (!$user) {
            throw new AuthorizationException(NOT_AUTHORIZED);
        }
        $orderdata = Order::where('customer_id', $request->get('id'))->get();
        $wishlists = Wishlist::select('products.*', 'wishlists.user_id AS wuser', 'wishlists.product_id AS wproid')
        ->leftJoin('products', 'products.id', '=', 'wishlists.product_id')->having('wishlists.user_id', '=', $request->get('id'))->get();
        $addtocart = Addtocart::select('products.*', 'addtocart.user_id AS wuser', 'addtocart.product_id AS wproid')
        ->leftJoin('products', 'products.id', '=', 'addtocart.product_id')->having('addtocart.user_id', '=', $request->get('id'))->get();
        return [
            "order"=>$orderdata,
            "wishlist"=>$wishlists,
            "addtocart"=>$addtocart
        ];
    }
    public function AddtocartProduct(Request $request){
        try {
            $user = $request->user();
            if (!$user) {
                throw new AuthorizationException(NOT_AUTHORIZED);
            }

            $addtocart = Addtocart::where('user_id',$user->id)
                ->where('product_id',$request->get('input')['productid'])
                ->first();
            if (empty($addtocart) || ($addtocart->variation_option_id ?? '')!=($request->get('input')['variation_option_id'] ?? '')) {
                $addtocart = new Addtocart();
                $addtocart->user_id = $user->id;
                $addtocart->product_id = $request->get('input')['productid'];
                $addtocart->variation_option_id  = $request->get('input')['variation_option_id'] ?? '';
                $addtocart->order_quantity  = $request->get('input')['order_quantity'] ?? 1;
                $addtocart->unit_price  = $request->get('input')['unit_price'] ?? '';
                $addtocart->subtotal  = $request->get('input')['subtotal'] ?? '';
                $addtocart->save();
                return 'Success';
            }else{
                $addtocart->order_quantity  = $request->get('input')['order_quantity'] ?? 1;
                $addtocart->unit_price  = $request->get('input')['unit_price'] ?? '';
                $addtocart->subtotal  = $request->get('input')['subtotal'] ?? '';
                return 'Success';
            }
            return 'ok';
        } catch (MarvelException $e) {
            throw new MarvelException(SOMETHING_WENT_WRONG, $e->getMessage());
        }
    }
    public function AddtocartProductRemove(Request $request){
        try {
            $user = $request->user();
            if (!$user) {
                throw new AuthorizationException(NOT_AUTHORIZED);
            }

            $addtocart = AddToCart::where('user_id', $user->id)
                ->where('product_id', $request->get('input')['productid'])
                ->first();
            if ($addtocart) {
                $addtocart->delete();
                return 'Success';
            }

            return 'ok';
        } catch (MarvelException $e) {
            throw new MarvelException(SOMETHING_WENT_WRONG, $e->getMessage());
        }
    }
    public function orderstatus(Request $request){
        $datalist = Order::where('order_status','=',$request->status)->orderBy('id', 'DESC')->get();
        return $datalist;
    }
    
    public function fetchProducts(Request $request)
    {

        $unavailableProducts = [];
        $language = $request->language ? $request->language : DEFAULT_LANGUAGE;

        $products_query = $this->productrepository->where('language', $language);

        if (isset($request->date_range)) {
            $dateRange = explode('//', $request->date_range);
            $unavailableProducts = $this->repository->getUnavailableProducts($dateRange[0], $dateRange[1]);
        }
        if (in_array('variation_options.digital_files', explode(';', $request->with)) || in_array('digital_files', explode(';', $request->with))) {
            throw new AuthorizationException(NOT_AUTHORIZED);
        }
        $products_query = $products_query->whereNotIn('id', $unavailableProducts);

        if ($request->flash_sale_builder) {
            $products_query = $this->repository->processFlashSaleProducts($request, $products_query);
        }

        return $products_query;
    }
    public function reviewList(Request $request) {

        $orders = Review::where('shop_id', $request->shopReviewId)->get();
        return $orders;
    }

    public function fetchRefunds(Request $request) {
        {
            try {
                $language = $request->language ?? DEFAULT_LANGUAGE;
                $user = $request->user();
                if (!$user) {
                    throw new AuthorizationException(NOT_AUTHORIZED);
                }

                $orderQuery = $this->refundRepository->whereHas('order', function ($q) use ($language) {
                    $q->where('language', $language);
                });

                switch ($user) {
                    case $user->hasPermissionTo(Permission::SUPER_ADMIN):
                        if ((!isset($request->shop_id) || $request->shop_id === 'undefined')) {
                            return $orderQuery->where('id', '!=', null)->where('shop_id', '=', null);
                        }
                        
                        return $orderQuery->where('shop_id', '=', $request->shop_id);
                        break;

                    case $this->refundRepository->hasPermission($user, $request->shop_id):
                        return $orderQuery->where('shop_id', '=', $request->shop_id);
                        break;

                    case $user->hasPermissionTo(Permission::CUSTOMER):
                        return $orderQuery->where('customer_id', $user->id)->where('shop_id', null);
                        break;

                    default:
                        return $orderQuery->where('customer_id', $user->id)->where('shop_id', null);
                        break;
                }
            } catch (MarvelException $th) {
                throw new MarvelException(SOMETHING_WENT_WRONG);
            }
        }

    }
    public function shopDateSelectionView(Request $request)
    {
        $startDate = $request->get('input')['startdate'];
        $endDate =  $request->get('input')['enddate'];

        $startDates = strtotime($startDate);
        $endDates = strtotime($endDate);

        $shopDetail = $this->fetchOrders($request)->with('children')->where('shop_id', $request->input['shopid'])->whereBetween('created_at', [date('Y-m-d h:i:s', $startDates), date('Y-m-d h:i:s', $endDates)])->count();
    
        $productsDetail = $this->fetchProducts($request)->where('shop_id', $request->input['shopid'])->whereBetween('created_at',  [date('Y-m-d h:i:s', $startDates), date('Y-m-d h:i:s', $endDates)])->count();

        $reviewDetail =  $this->reviewList($request)->where('shop_id', $request->input['shopid'])->whereBetween('created_at', [date('Y-m-d h:i:s', $startDates), date('Y-m-d h:i:s', $endDates)])->count();
        
        $refundsDetail =  $this->fetchRefunds($request)->where('shop_id', $request->input['shopid'])->whereBetween('created_at', [date('Y-m-d h:i:s', $startDates), date('Y-m-d h:i:s', $endDates)])->count();

        $grossSalesDetail = $this->fetchOrders($request)->with('children')->where('shop_id', $request->input['shopid'])->whereBetween('created_at', [date('Y-m-d h:i:s', $startDates), date('Y-m-d h:i:s', $endDates)])->pluck('amount')->sum();

        $status = 'order-pending';
        $pendingOrderList = Order::where('order_status','=',$status)->orderBy('id', 'DESC')->get();
        $pendingOrdersDetail  = $pendingOrderList->where('shop_id', $request->input['shopid'])->whereBetween('created_at', [date('Y-m-d h:i:s', $startDates), date('Y-m-d h:i:s', $endDates)])->count();

        $orderCount =  strval($shopDetail); 
        $productCount = strval($productsDetail);
        $reviewCount = strval($reviewDetail);
        $refundsCount = strval($refundsDetail);
        $grossSalesCount = strval($grossSalesDetail);
        $pendingOrdersCount = strval($pendingOrdersDetail);
    
        $array = [
            'orderCount' => $orderCount,
            'productCount' => $productCount,
            'reviewCount' => $reviewCount,
            'refundsCount' => $refundsCount,
            'grossSalesCount' => $grossSalesCount,
            'pendingOrdersCount' => $pendingOrdersCount
        ]; 

        return $array;   
    }

    public function fetchDashboadOrders(Request $request)
    {
        $startDate = $request->start_date;
        $endDate =  $request->end_date;

        $startDates = strtotime($startDate);
        $endDates = strtotime($endDate);
        {
            $user = $request->user();

            if (!$user) {
                throw new AuthorizationException(NOT_AUTHORIZED);
            }

            $Orderalertupdate = User::where('id','=',$user->id)->first();
            if ($Orderalertupdate) {
                $Orderalertupdate->orderalert = 0;
                $Orderalertupdate->save();
            }
            return $this->repository->with('children')->where('id', '!=', null)->whereBetween('created_at', [$startDate, $endDate]);
        }
    }

    // Orders with status and date selection
    public function fetchOrdersByDateSelection(Request $request){
        $startDate = $request->start_date;
        $endDate =  $request->end_date;

        $startDates = strtotime($startDate);
        $endDates = strtotime($endDate);
        {
            $user = $request->user();
            if (!$user) {
                throw new AuthorizationException(NOT_AUTHORIZED);
            }
            $Orderalertupdate = User::where('id','=',$user->id)->first();
            if ($Orderalertupdate) {
                $Orderalertupdate->orderalert = 0;
                $Orderalertupdate->save();
            }
            return $this->repository->with('children')->where('id', '!=', null)->where('order_status','=',$request->status)->whereBetween('created_at', [$startDate, $endDate])->orderBy('id', 'DESC');
        }
    }

    // Orders based on status
    public function fetchOrdersByStatus(Request $request){
        return $this->repository->with('children')->where('id', '!=', null)->where('order_status','=',$request->status)->orderBy('id', 'DESC');
    }

    // All orders with date selection
    public function fetchAllOrdersByDateSelection(Request $request){
        $startDate = $request->start_date;
        $endDate =  $request->end_date;

        $startDates = strtotime($startDate);
        $endDates = strtotime($endDate);
        {
            $user = $request->user();
            if (!$user) {
                throw new AuthorizationException(NOT_AUTHORIZED);
            }
            $Orderalertupdate = User::where('id','=',$user->id)->first();
            if ($Orderalertupdate) {
                $Orderalertupdate->orderalert = 0;
                $Orderalertupdate->save();
            }
            return $this->repository->with('children')->where('id', '!=', null)->whereBetween('created_at', [$startDate, $endDate])->orderBy('id', 'DESC');
        }
    } 

    public function cancelOrder(Request $request) {

        $CancelOrderdData = Order::where('tracking_number',$request->orderId)->first();
        if($CancelOrderdData){
            $CancelOrderdData->order_status = 'order-cancelled';
            $CancelOrderdData->save();
        }
       return $CancelOrderdData;
    }
}
