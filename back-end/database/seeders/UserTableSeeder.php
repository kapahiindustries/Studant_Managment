<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use Carbon\Carbon;

class UserTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $users = array(
            'id'           =>  1,
            'name'         =>  'Admin',
            'last_name'    =>  'Admin',
            'class_name'   =>  'admin',
            'roll_number'  =>  'admin123',
            'email'        =>  'admin@gmail.com',
            'password'     =>  bcrypt('123456'),
            'role_id'      =>  0,
            'created_at'   =>  Carbon::now()->format('Y-m-d H:i:s'),
            'updated_at'   =>  Carbon::now()->format('Y-m-d H:i:s')
        ); 
        User::updateOrCreate([
            'id' => $users['id'] 
        ],$users);    
    }
}
