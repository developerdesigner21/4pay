import Card from '@/components/common/card';
import Layout from '@/components/layouts/admin';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { adminOnly } from '@/utils/auth-utils';
import { TimerIcon } from '@/components/icons/dashboard-header/timer-icon';
import Button from '@/components/ui/button';
import { DownloadIcon } from '@/components/icons/download-icon';
import Group1 from '@/assets/Group1.png'
import Group2 from '@/assets/Group2.png'
import Group3 from '@/assets/Group3.png'
import Viewmoreicon from '@/assets/Viewmore.png'
import Viewlessicon from '@/assets/Frame (3).png'
import icon from '@/assets/Frame (1).png'
import icon2 from '@/assets/Vector.png'
import Image from 'next/image';
import Avatar from '@/components/common/avatar';
import { MoreIcon } from '@/components/icons/more-icon';
import { DatePicker } from '@/components/ui/date-picker';
import { useEffect, useState } from 'react';
import dayjs from 'dayjs';


import CopyToClipboard from 'react-copy-to-clipboard';
import CopyClipbordIcon from '@/assets/CopyClipbord.png'
import { useOrderstatusMutation } from '@/graphql/orders.graphql';
import { useTranslation } from 'next-i18next';
import Loader from '@/components/ui/loader/loader';


export default function WebsiteCancelledOrdersPage() {
    const { t } = useTranslation();
    const [startDate, setStartDate] = useState();
    const [endDate, setEndDate] = useState();
    const [isDisplaymore, setIsDisplayMore] = useState(false);
    const [copyText, setCopyText] = useState({
        value: 'Customer',
        copied: false,
    });


    const [orderstatus, { data, loading, }] = useOrderstatusMutation({});
    useEffect(() => {
        orderstatus({
            variables: {
                status: "order-cancelled"
            },
        });
    }, [])
    console.log("Cancel order:", data)
    const CancelledOrderData = data?.orderstatus;
    if (loading) return <Loader text={t('common:text-loading')} />;


    let test = dayjs(startDate).format('DD/MM/YYYY')
    console.log("startDate", test)
    const handleStartDate = (e: any) => {
        setStartDate(e);
    }
    const handleEndDate = (e: any) => {
        setEndDate(e);
    }
    const handelgenrateOrder = (startdate: any, enddate: any) => {
        console.log("startdate & EndDate", startdate, enddate)
    }
    const toggleReadMore = () => {
        setIsDisplayMore(true)
    }
    const toggleViewLess = () => {
        setIsDisplayMore(false)
    }
    return (
        <>
            <div className='grid grid-cols-1 gap-3  lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-2'>
                <div className="relative max-w-lg ">
                    <DatePicker
                        dateFormat="dd/MM/yyyy"
                        onChange={handleStartDate}
                        //@ts-ignore
                        selected={startDate}
                        selectsStart
                        startDate={new Date()}
                        className="border border-border-base w-48"
                        placeholderText='Select Start Date'
                    />
                </div>
                <div className="relative max-w-lg ">
                    <DatePicker
                        dateFormat="dd/MM/yyyy"
                        onChange={handleEndDate}
                        //@ts-ignore
                        selected={endDate}
                        selectsStart
                        startDate={new Date()}
                        // className="border border-border-base"
                        placeholderText='Select End Date'
                    />
                </div>
                <div className='flex flex-col md:flex-row lg:flex-row gap-5 '>

                    <div className='relative w-auto m-auto lg:m-0'>
                        <Button
                            className="bg-blue-500 " >
                            <p>Actualizar</p>
                        </Button>
                    </div>

                    <div className='relative w-auto m-auto  lg:m-0'>
                        <Button
                            className="bg-blue-500 " >
                            <DownloadIcon className="h-4 w-4 me-3" />
                            <p>Download CSV</p>
                        </Button>
                    </div>
                </div>
            </div>

            <div className='grid grid-cols-1 lg:grid-cols-3 py-5 lg:space-x-5 space-y-3 lg:space-y-0  '>
                <div className='bg-white p-5 rounded-lg shadow'>
                    <div className='flex flex-col md:flex-col lg:flex-col xl:flex-row  '>
                        <div>
                            <Image
                                className='max-w-xs mt-2 m-auto'
                                src={Group1}
                                alt={''} />
                        </div>
                        <div className='xl:pl-10 space-y-2'>
                            <div className='flex flex-row justify-between'>
                                <p className='text-sm'>Order Rappi Cargo Ecommerce</p>
                                <p className='text-black font-semibold'>$3,668.00</p>
                            </div>
                            <div className='flex flex-row space-x-5'>
                                <p className='text-sm'>Order Uber Daas Ecommerce</p>
                                <p className='text-black font-semibold'>$6,521.00</p>
                            </div>
                            <div className='flex flex-row space-x-5'>
                                <p className='text-sm'>POS Store Sales</p>
                                <p className='text-black font-semibold'>$3,601.00</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='bg-white p-5 rounded-lg shadow'>
                    <div className='flex flex-col md:flex-col lg:flex-col xl:flex-row  '>
                        <div>
                            <Image
                                className=' h-auto max-w-xs mt-2 m-auto '
                                src={Group2}
                                alt={''}
                                width={67}
                                height={3}
                            />
                        </div>
                        <div className='xl:pl-10 space-y-2'>
                            <div className='flex flex-row justify-between'>
                                <p className='text-sm'>Cash Rappi Cargo Ecommerce</p>
                                <p className='text-black font-semibold'>$3,668.00</p>
                            </div>
                            <div className='flex flex-row space-x-5'>
                                <p className='text-sm'>Cash Uber Daas Ecommerce </p>
                                <p className='text-black font-semibold'>$6,521.00</p>
                            </div>
                            <div className='flex flex-row space-x-5'>
                                <p className='text-sm'>POS Card payments</p>
                                <p className='text-black font-semibold'>$3,601.00</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='bg-white p-5 rounded-lg shadow'>
                    <div className='flex flex-col md:flex-col lg:flex-col xl:flex-row  '>
                        <div>
                            <Image
                                className=' max-w-xs mt-2 m-auto'
                                src={Group3}
                                alt={''}
                            // width={100}
                            // height={3}
                            />
                        </div>
                        <div className='xl:pl-10 space-y-2'>
                            <div className='flex flex-row justify-between'>
                                <p className='text-sm'>CARD Rappi Cargo Ecommerce</p>
                                <p className='text-black font-semibold'>$3,668.00</p>
                            </div>
                            <div className='flex flex-row space-x-5'>
                                <p className='text-sm'>CARD Uber Daas Ecommerce</p>
                                <p className='text-black font-semibold'>$6,561.00</p>
                            </div>
                            <div className='flex flex-row space-x-5'>
                                <p className='text-sm'>Total Sales</p>
                                <p className='text-black font-semibold'>$65,561.00</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* FF000017 */}

            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-14 py-5'>
                {CancelledOrderData?.map((item: any) => {
                    console.log("PendingOrdr", item)
                    return (
                        <div className='bg-[#FF000017] p-5 rounded-lg' key={item.id}>
                            <div className='flex felx-row justify-between justify-items-center	'>
                                <Avatar name={item?.customer?.name} />
                                <p className='text-2xl font-semibold'>{item?.customer?.name}</p>
                                <MoreIcon className='h-4' />
                            </div>
                            <div className='flex felx-row justify-between pt-5'>
                                <p className='text-sm'>{item.tracking_number}</p>
                                <p className='text-sm'>{item.created_at}</p>
                            </div>
                            <div className='bg-[#1B5764] p-3 flex justify-center rounded mt-5'>
                                <p className='text-white'> 💵 The delivery person will pay in Cash</p>
                            </div>
                            <div>
                                <p className='text-black font-semibold text-base border-b-2 border-[#DCDCDC] py-5 text-center'>Vape 2 Go (Guadalajara)</p>
                                <p className='text-[#175B46] font-semibold border-b-2 border-[#DCDCDC] py-3 text-center'>{item.order_status}</p>
                                <p className='text-[#6A7575] font-semibold border-b-2 border-[#DCDCDC] py-3 text-center'>UberDass Id: C2A00</p>
                                <div className='flex flex-row border-b-2 border-[#DCDCDC] py-3 justify-between'>
                                    <p className='text-sm'>Order type :</p>
                                    <div className='flex flex-row space-x-3'>
                                        <Image src={icon} alt={''} />
                                        <p className='text-sm'>Envío ASAP</p>
                                        <Image src={Viewmoreicon} alt={''} />
                                    </div>
                                </div>
                                <div className='flex flex-row justify-between border-b-2 border-[#DCDCDC] py-3' >
                                    <p className='text-sm'>Preparation time</p>
                                    <p className='text-sm'>1min</p>
                                </div>
                                <div className='border-b-2 border-[#DCDCDC] '>
                                    <div className='bg-white rounded-lg my-5 p-5'>
                                        <p className='text-sm'>ELF BAR BC5000</p>
                                        <p className='text-sm'>·ELF MIAMI MINT x 1</p>
                                    </div>
                                </div>
                                <div className='border-b-2 border-[#DCDCDC] '>
                                    <div className='flex flex-row justify-between'>
                                        <p className='text-sm'>Order cost::</p>
                                        <p>{item.amount}</p>
                                    </div>
                                    <div className='flex flex-row justify-between '>
                                        <p className='text-sm'>Discount: :</p>
                                        <p>{item.discount}</p>
                                    </div>
                                    <div className='flex flex-row justify-between '>
                                        <p className='text-sm'>Extra driving distance:</p>
                                        <p>{item.shop?.distance}</p>
                                    </div>

                                    <div className='flex flex-row justify-between '>
                                        <p className='text-sm'>Cost of shipping: :</p>
                                        <p>{item.delivery_fee}</p>
                                    </div>
                                    <div className='flex flex-row justify-between '>
                                        <p className='text-sm'>Shipping bonus:: </p>
                                        <p></p>
                                    </div>
                                    <div className='flex flex-row justify-between '>
                                        <p className='text-sm'>Total :</p>
                                        <p>{item.total}</p>
                                    </div>
                                </div>
                                <div className='flex flex-row justify-between py-3' >
                                    <p className='text-sm'>Payment Method</p>
                                    <p className='text-sm'>{item.payment_gateway}</p>
                                    {/* <p className='text-sm'>Card 💳</p> */}
                                </div>
                                <div className='flex flex-row justify-between'>
                                    <p className='text-sm'>Comment</p>
                                    <p className='text-sm'>{item.note}</p>
                                </div>
                                <div className='py-3'>
                                    <div className='space-y-3'>
                                        <p className='font-semibold'>Customer</p>

                                        <div className='flex w-full items-center justify-between '>
                                            <form className='w-full'>
                                                <div
                                                    className='relative flex rounded md:rounded-lg'>
                                                    <input
                                                        type="text"
                                                        autoComplete="off"
                                                        value={item.customer?.name}
                                                        className='search item-center flex h-full p-2 w-full appearance-none overflow-hidden truncate text-sm text-heading placeholder-gray-500 transition duration-300 ease-in-out focus:outline-0 focus:ring-0'

                                                    />
                                                    <button className="flex  items-center justify-center  bg-white  font-semibold text-light  duration-200   focus:outline-0 ltr:rounded-tl-none ltr:rounded-bl-none rtl:rounded-tr-none rtl:rounded-br-none">
                                                        <CopyToClipboard
                                                            text={item.customer?.name}
                                                            onCopy={() =>
                                                                setCopyText((prev: any) => ({
                                                                    ...prev,
                                                                    copied: true,
                                                                }))}>
                                                            <Image src={CopyClipbordIcon} alt={''} className="h-5 w-5 ltr:mr-2.5 rtl:ml-2.5" />
                                                        </CopyToClipboard>
                                                    </button>
                                                </div>
                                            </form>
                                        </div>

                                        <div className='flex w-full items-center justify-between '>
                                            <form className='w-full'>
                                                <div
                                                    className='relative flex rounded md:rounded-lg'>
                                                    <input
                                                        type="text"
                                                        autoComplete="off"
                                                        value={item.customer_contact}
                                                        className='search item-center flex h-full p-2 w-full appearance-none overflow-hidden truncate text-sm text-heading placeholder-gray-500 transition duration-300 ease-in-out focus:outline-0 focus:ring-0'

                                                    />
                                                    <button className="flex  items-center justify-center  bg-white  font-semibold text-light  duration-200   focus:outline-0 ltr:rounded-tl-none ltr:rounded-bl-none rtl:rounded-tr-none rtl:rounded-br-none">
                                                        <CopyToClipboard
                                                            text={item.customer_contact}
                                                            onCopy={() =>
                                                                setCopyText((prev: any) => ({
                                                                    ...prev,
                                                                    copied: true,
                                                                }))}>
                                                            <Image src={CopyClipbordIcon} alt={''} className="h-5 w-5 ltr:mr-2.5 rtl:ml-2.5" />
                                                        </CopyToClipboard>
                                                    </button>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                    <div className='space-y-3'>
                                        <div className='flex flex-row justify-between pt-3'>
                                            <p className='text-sm'>Repartidor</p>
                                            <p className='text-sm'>ID-# 7A4 2BF</p>
                                        </div>
                                        <div className='flex w-full items-center justify-between '>
                                            <form className='w-full'>
                                                <div
                                                    className='relative flex rounded md:rounded-lg'>
                                                    <input
                                                        type="text"
                                                        autoComplete="off"
                                                        value={item.customer_contact}
                                                        className='search item-center flex h-full p-2 w-full appearance-none overflow-hidden truncate text-sm text-heading placeholder-gray-500 transition duration-300 ease-in-out focus:outline-0 focus:ring-0'

                                                    />
                                                    <button className="flex  items-center justify-center  bg-white  font-semibold text-light  duration-200   focus:outline-0 ltr:rounded-tl-none ltr:rounded-bl-none rtl:rounded-tr-none rtl:rounded-br-none">
                                                        <CopyToClipboard
                                                            text={item.customer_contact}
                                                            onCopy={() =>
                                                                setCopyText((prev: any) => ({
                                                                    ...prev,
                                                                    copied: true,
                                                                }))}>
                                                            <Image src={CopyClipbordIcon} alt={''} className="h-5 w-5 ltr:mr-2.5 rtl:ml-2.5" />
                                                        </CopyToClipboard>
                                                    </button>
                                                </div>
                                            </form>
                                        </div>
                                        <div className='flex w-full items-center justify-between '>
                                            <form className='w-full'>
                                                <div
                                                    className='relative flex rounded md:rounded-lg'>
                                                    <input
                                                        type="text"
                                                        autoComplete="off"
                                                        value={item.customer_contact}
                                                        className='search item-center flex h-full p-2 w-full appearance-none overflow-hidden truncate text-sm text-heading placeholder-gray-500 transition duration-300 ease-in-out focus:outline-0 focus:ring-0'

                                                    />
                                                    <button className="flex  items-center justify-center  bg-white  font-semibold text-light  duration-200   focus:outline-0 ltr:rounded-tl-none ltr:rounded-bl-none rtl:rounded-tr-none rtl:rounded-br-none">
                                                        <CopyToClipboard
                                                            text={item.customer_contact}
                                                            onCopy={() =>
                                                                setCopyText((prev: any) => ({
                                                                    ...prev,
                                                                    copied: true,
                                                                }))}>
                                                            <Image src={CopyClipbordIcon} alt={''} className="h-5 w-5 ltr:mr-2.5 rtl:ml-2.5" />
                                                        </CopyToClipboard>
                                                    </button>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                    <div className='relative max-w-2xl bg-white flex flex-row my-10 p-5 border-dashed border-2 border-black justify-center '>
                                        <Image src={icon2} alt={''} />
                                        <p className='px-3'>See route</p>
                                    </div>
                                    {/* <div className='py-5 cursor-pointer flex flex-row justify-center' onClick={toggleViewLess}>
                                            <p className='text-center text-sm'>View Less</p> <Image src={Viewlessicon} alt={''} className='-mt-0.5' />
                                        </div> */}
                                </div>
                                {/* {isDisplaymore === false ?
                                    <div className='py-5 cursor-pointer flex flex-row justify-center' onClick={toggleReadMore}>
                                        <p className='text-center text-sm'>View More</p> <Image src={Viewmoreicon} alt={''} className='-mt-0.5' />
                                    </div> : ''}
                                {isDisplaymore === true ?
                                    <div className='py-3'>
                                        <div className='space-y-3'>
                                            <p className='font-semibold'>Customer</p>

                                            <div className='relative flex w-full items-center '>
                                                <input type='text' className='w-full p-2 text-sm border:hidden' value={item.customer?.name} />
                                                <CopyToClipboard
                                                    text={'Mariana Rubio'}
                                                    onCopy={() =>
                                                        setCopyText((prev: any) => ({
                                                            ...prev,
                                                            copied: true,
                                                        }))
                                                    }>
                                                    <Image src={CopyClipbordIcon} alt={''} className="absolute  text-body outline-none  focus:outline-none active:outline-none ml-80 cursor-pointer" />
                                                </CopyToClipboard>
                                            </div>
                                            <div className='relative flex w-full items-center '>
                                                <input type=" text" className='w-full p-2 text-sm' value={item.customer_contact} />
                                                <CopyToClipboard
                                                    text={'Mariana Rubio'}
                                                    onCopy={() =>
                                                        setCopyText((prev: any) => ({
                                                            ...prev,
                                                            copied: true,
                                                        }))
                                                    }>
                                                    <Image src={CopyClipbordIcon} alt={''} className="absolute  text-body outline-none  focus:outline-none active:outline-none ml-80 cursor-pointer" />
                                                </CopyToClipboard>
                                            </div>
                                        </div>
                                        <div className='space-y-3'>
                                            <div className='flex flex-row justify-between pt-3'>
                                                <p className='text-sm'>Repartidor</p>
                                                <p className='text-sm'>ID-# 7A4 2BF</p>
                                            </div>
                                            <div className='relative flex w-full items-center '>
                                                <input type='text' className='w-full p-2 text-sm' value={'Miguel Sahagun'} />
                                                <CopyToClipboard
                                                    text={'Mariana Rubio'}
                                                    onCopy={() =>
                                                        setCopyText((prev: any) => ({
                                                            ...prev,
                                                            copied: true,
                                                        }))
                                                    }>
                                                    <Image src={CopyClipbordIcon} alt={''} className="absolute  text-body outline-none  focus:outline-none active:outline-none ml-80 cursor-pointer" />
                                                </CopyToClipboard>
                                            </div>
                                            <div className='relative flex w-full items-center '>
                                                <input type='text' className='w-full p-2 text-sm' value={'+52 33 1042 6619'} />
                                                <CopyToClipboard
                                                    text={'52 33 1042 6619'}
                                                    onCopy={() =>
                                                        setCopyText((prev: any) => ({
                                                            ...prev,
                                                            copied: true,
                                                        }))
                                                    }>
                                                    <Image src={CopyClipbordIcon} alt={''} className="absolute  text-body outline-none  focus:outline-none active:outline-none ml-80 cursor-pointer" />
                                                </CopyToClipboard>
                                            </div>
                                        </div>
                                        <div className='relative max-w-2xl bg-white flex flex-row my-10 p-5 border-dashed border-2 border-black justify-center '>
                                            <Image src={icon2} alt={''} />
                                            <p className='px-3'>See route</p>
                                        </div>
                                        <div className='py-5 cursor-pointer flex flex-row justify-center' onClick={toggleViewLess}>
                                            <p className='text-center text-sm'>View Less</p> <Image src={Viewlessicon} alt={''} className='-mt-0.5' />
                                        </div>
                                    </div>
                                    : ''
                                } */}
                            </div>
                            <div>
                            </div>
                        </div>
                    )
                })}

            </div>
        </>
    );
}

WebsiteCancelledOrdersPage.authenticate = {
    permissions: adminOnly,
};
WebsiteCancelledOrdersPage.Layout = Layout;

export const getStaticProps = async ({ locale }: any) => ({
    props: {
        ...(await serverSideTranslations(locale, ['table', 'common', 'form'])),
    },
});
