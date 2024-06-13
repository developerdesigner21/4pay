<?php

namespace Marvel\Database\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Addtocart extends Model
{
    protected $table = 'addtocart';

    public $guarded = [];

    protected $data_array = ['product_id'];

    /**
     * Get the product that owns the wishlist.
     */
    public function product()
    {
        return $this->belongsTo(Product::class);
    }

    /**
     * Get the user that owns the comment.
     */
    public function user() : BelongsTo
    {
        return $this->belongsTo(User::class);
    }


    public function productVariation()
    {
        return $this->belongsTo(Variation::class,'variation_option_id');
    }
}
