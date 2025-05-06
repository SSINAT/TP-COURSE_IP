<?php

namespace Tests\Unit;

use Tests\TestCase;

class ProductTest extends TestCase
{

    public function test_if_we_can_access_get_products_api(): void
    {
        $request = $this->get('/api/products');

        $request->assertStatus(200);
    }

 
    public function test_if_we_can_access_create_product_api(): void
    {
        $request = $this->post("/api/products", [
            "name" => "test_product_01",
            "pricing" => 100,
            "category_id" => 2,
        ]);

        $request->assertStatus(201)->assertJson([
            "name" => "test_product_01",
            "pricing" => 100,
            "category_id" => 2,
        ]);
    }
 
    public function test_if_we_can_access_get_product_by_id_api() {
        $request = $this->get('/api/products/1');

        $request->assertStatus(200)->assertJson(["id" => 1]);
    }


    public function test_if_we_can_access_update_product_by_id_api() {
        $request = $this->patch('/api/products/1', [
            "name" => "test_product_01_updated",
            "pricing" => 999,
            "category_id" => 2,
        ]);

        $request->assertStatus(200)->assertJson([
            "id" => 1,
            "name" => "test_product_01_updated",
            "pricing" => 999,
            "category_id" => 2,
        ]);
    }


    public function test_if_we_can_delete_product_api() {
        $request = $this->delete('/api/products/1');
        $request->assertStatus(200)->assertJson(['id' => 1]);

        $request = $this->get('/api/products/1');
        $request->assertStatus(200)->assertDontSee(["id" => 1]);
    }
}