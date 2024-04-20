<?php


namespace Marvel\GraphQL\Queries;


use Nuwave\Lighthouse\Support\Contracts\GraphQLContext;
use Marvel\Facades\Shop;

class OrderQuery
{
    public function fetchOrders($rootValue, array $args, GraphQLContext $context)
    {
        return Shop::call('Marvel\Http\Controllers\OrderController@fetchOrders', $args);
    }

    public function fetchOrdersByDateSelection($rootValue, array $args, GraphQLContext $context)
    {
        return Shop::call('Marvel\Http\Controllers\OrderController@fetchOrdersByDateSelection', $args);
    }

    public function fetchOrdersByStatus($rootValue, array $args, GraphQLContext $context)
    {
        return Shop::call('Marvel\Http\Controllers\OrderController@fetchOrdersByStatus', $args);
    }
    public function fetchAllOrdersByDateSelection($rootValue, array $args, GraphQLContext $context)
    {
        return Shop::call('Marvel\Http\Controllers\OrderController@fetchAllOrdersByDateSelection', $args);
    }

    public function fetchSingleOrder($rootValue, array $args, GraphQLContext $context)
    {
        return Shop::call('Marvel\Http\Controllers\OrderController@fetchSingleOrder', $args);
    }

    public function fetchDashboadOrders($rootValue, array $args, GraphQLContext $context)
    {
        return Shop::call('Marvel\Http\Controllers\OrderController@fetchDashboadOrders', $args);
    }
}
