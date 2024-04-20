<?php


namespace Marvel\GraphQL\Mutation;

use Nuwave\Lighthouse\Support\Contracts\GraphQLContext;
use Marvel\Exceptions\MarvelException;
use Marvel\Facades\Shop;

class OrderMutator
{

    public function store($rootValue, array $args, GraphQLContext $context)
    {
        return Shop::call('Marvel\Http\Controllers\OrderController@store', $args);
    }
    public function update($rootValue, array $args, GraphQLContext $context)
    {
        return Shop::call('Marvel\Http\Controllers\OrderController@updateOrder', $args);
    }
    public function generateInvoiceDownloadUrl($rootValue, array $args, GraphQLContext $context)
    {
        return Shop::call('Marvel\Http\Controllers\OrderController@downloadInvoiceUrl', $args);
    }
    public function createOrderPayment($rootValue, array $args, GraphQLContext $context)
    {
        return Shop::call('Marvel\Http\Controllers\OrderController@submitPayment', $args);
    }
    public function isorderalert($rootValue, array $args, GraphQLContext $context)
    {
        return Shop::call('Marvel\Http\Controllers\OrderController@IsorderalertCon', $args);
    }
    public function productAddtocart($rootValue, array $args, GraphQLContext $context)
    {
        return Shop::call('Marvel\Http\Controllers\OrderController@productAddtocart', $args);
    }
    public function AddtocartProduct($rootValue, array $args, GraphQLContext $context)
    {
        return Shop::call('Marvel\Http\Controllers\OrderController@AddtocartProduct', $args);
    }
    public function AddtocartProductRemove($rootValue, array $args, GraphQLContext $context)
    {
        return Shop::call('Marvel\Http\Controllers\OrderController@AddtocartProductRemove', $args);
    }
    public function orderstatus($rootValue, array $args, GraphQLContext $context)
    {
        return Shop::call('Marvel\Http\Controllers\OrderController@orderstatus', $args);
    }
    // public function dateSelection($rootValue, array $args, GraphQLContext $context)
    // {
    //     return Shop::call('Marvel\Http\Controllers\OrderController@dateSelection', $args);
    // }
    public function dateSelectionAllOrders($rootValue, array $args, GraphQLContext $context)
    {
        return Shop::call('Marvel\Http\Controllers\OrderController@dateSelectionAllOrders', $args);
    }

    public function shopDateSelectionView($rootValue,array $args,GraphQLContext $context)
    {
        return Shop::call('Marvel\Http\Controllers\OrderController@shopDateSelectionView',$args);
    }
    public function reviewList($rootValue, array $args, GraphQLContext $context)
    {
        return Shop::call('Marvel\Http\Controllers\OrderController@reviewList', $args);
    }

    public function DashboardDateSelectionView($rootValue, array $args, GraphQLContext $context)
    {
        return Shop::call('Marvel\Http\Controllers\AnalyticsController@DashboardDateSelectionView', $args);
    }
    public function cancelOrder($rootValue, array $args, GraphQLContext $context)
    {
        return Shop::call('Marvel\Http\Controllers\OrderController@cancelOrder', $args);
    }
}
