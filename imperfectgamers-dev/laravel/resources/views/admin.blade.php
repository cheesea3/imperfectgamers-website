@extends('layouts.app')

@section('content')
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-md-8">
                <div class="card">
                    <div class="card-header">Admin panel</div>

                    <div class="card-body">
                     @foreach($users as $user)
                     <div class="row mb-4">
                         <div class="col-sm-6">
                             {{$user->name}}
                             @foreach($user->roles as $role)
                                 <small class="text-muted">{{$role->name}}</small>
                             @endforeach
                         </div>
                         <div class="col-sm-6">
                             @if($user->hasRole('admin'))
                                    <a class="btn btn-primary" href="/admin/remove-admin/{{$user->id}}">
                                    Remove Admin
                                    </a>
                                 @else
                                 <a class="btn btn-primary" href="/admin/give-admin/{{$user->id}}">
                                     Give Admin
                                 </a>
                             @endif
                         </div>
                     </div>
                     @endforeach
                    </div>
                </div>
            </div>
        </div>
    </div>
@endsection
