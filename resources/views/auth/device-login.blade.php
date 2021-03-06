@extends('layouts.single')

@section('title', 'LENGKO - Login Perangkat')

@section('content')
  <div class="row mrg-b-30">
    <div class="col-xs-12 col-sm-push-2 col-sm-8 col-md-push-4 col-md-4">
      <div id="form-login">
        <form method="POST" action="{{ route('device.login.submit') }}">
          <div class="form-section mrg-b-20">
            <a href="{{ url('/') }}">
              <img class="img-center" src="{{ url('/files/images/lengko-logo.png') }}" alt="" width="150px" height="70px" />
            </a>
            {{ csrf_field() }}
          </div>
          <div class="form-section {{ $errors->has('kode_perangkat') ? ' has-error' : '' }}">
            <input type="text" name="kode_perangkat" placeholder="Kode Perangkat" value="{{ old('email') }}">
            @if ($errors->has('kode_perangkat'))
              <span class="help-block">
                <strong>{{ $errors->first('kode_perangkat') }}</strong>
              </span>
            @endif
          </div>
          <div class="form-section {{ $errors->has('password') ? ' has-error' : '' }}">
            <input type="password" name="password" placeholder="Kata Sandi Perangkat">
            @if ($errors->has('password'))
              <span class="help-block">
                <strong>{{ $errors->first('password') }}</strong>
              </span>
            @endif
          </div>
          <div class="form-section">
            <button type="submit" class="btn-lengko btn-lengko-default block">Masuk</button>
          </div>
        </form>
      </div>
    </div>
  </div>
@endsection
