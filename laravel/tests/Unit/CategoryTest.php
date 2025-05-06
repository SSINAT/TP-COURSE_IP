<?php

namespace Tests\Unit;

use Tests\TestCase;

class CategoryTest extends TestCase
{
   
    public function test_if_we_can_access_get_all_categories_api(): void
    {
        $response = $this->get('/api/categories');
        $response->assertStatus(200);
    }


    public function test_if_we_can_access_create_category_api(): void
    {
        $response = $this->postJson('/api/categories', [
            "name" => "test_category_02"
        ]);
        $response->assertStatus(201)->assertJson(['name' => "test_category_02"]);

        $response = $this->postJson('/api/categories', [
            "name" => "test_category_02"
        ]);
        $response->assertStatus(201)->assertJson(['name' => "test_category_02"]);

        $response = $this->postJson('/api/categories', [
            "name" => "test_category_03"
        ]);
        $response->assertStatus(201)->assertJson(['name' => "test_category_03"]);
    }


    public function test_if_we_can_access_get_a_category_by_id_api(): void
    {
        $response = $this->get('/api/categories/1');
        $response->assertStatus(200)->assertJson(["id" => 1]);
    }


 
    public function test_if_we_can_access_update_a_category_by_id_api(): void
    {
        $response = $this->patch('/api/categories/2', ["name" => "test_category_updated"]);
        $response->assertStatus(200)->assertJson([
            "id" => 2,
            "name" => "test_category_updated"
        ]);
    }


    public function test_if_we_can_access_delete_a_category_by_id_api(): void
    {
        $response = $this->delete('/api/categories/1');
        $response->assertStatus(200)->assertJson(["id" => 1]);

        $request = $this->get('/api/categories/1');
        $request->assertStatus(200)->assertDontSee(["id" => 1]);
    }
}