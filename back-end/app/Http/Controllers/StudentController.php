<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Support\Facades\Validator;

class StudentController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        try {
            $user = User::where('role_id',1)->get();
            return response()->json(['success' => true, 'data' => $user ]);
        } catch (Exception $ex) {
            return response()->json([
                'success' => false, 
                'message' =>  'something went wrong please try again', 
                'error'=>$ex->getMessage() 
            ]);
        }   
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //Validate data
        $data = $request->only('name', 'email', 'last_name','roll_number','class_name');
        if(isset($request->id)){
            $alredy = '';
            $Id = $request->id;
        }else{
            $Id = 0;
            $alredy = 'unique:users';
            $roll   = 'unique:roll_number';
        }
        $Id = ['id'=>(isset($request->id))?$request->id:0];
        $validator = Validator::make($data, [
            'name'        => 'required|string',
            'email'       => 'required|email|'.$alredy,
            'last_name'   => 'required|string',
            'roll_number' => 'required|string',
            'class_name'  => 'required|string',
            // 'password' => 'required|string|min:6|max:50'
        ]);
        //Send failed response if request is not valid
        if ($validator->fails()) {
            return response()->json(['error' => $validator->messages()], 200);
        }
        try{
            //Request is valid, create new user
            $user = User::updateOrCreate($Id,[
                'name'        => $request->name,
                'email'       => $request->email,
                'last_name'   => $request->last_name,
                'roll_number' => $request->roll_number,
                'class_name'  => $request->class_name,
                'password'    => bcrypt($request->roll_number)
            ]);
            $message = ($user->wasRecentlyCreated)? 'Student created successfully':'Student updated successfully';
            //User created, return success response
            return response()->json([
                'success' => true,
                'message' => $message,
                'data' => $user
            ], Response::HTTP_OK);
        }catch (Exception $ex) {
            return response()->json([
                'success' => false, 
                'message' => 'something went wrong please try again', 
                'error'   => $ex->getMessage() 
            ]);
        }       
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Student  $student
     * @return \Illuminate\Http\Response
     */
    public function show(Student $student)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Student  $student
     * @return \Illuminate\Http\Response
     */
    public function edit(Student $student)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Student  $student
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Student $student)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Student  $student
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $userDelete = User::find($id)->delete();
        if($userDelete){
            return response()->json([
                'status' => true,
                'message' => 'Student Deleted Successfully'
            ]);
        }else{
            return response()->json([
                'status' => false,
                'message'=> 'something went wrong please try again', 
            ]);
        }
    }
}
