@extends('layout')

@section('content')
<div class="container mt-5">
    <h3>Connexion requise pour valider le panier</h3>

    @if (session('message'))
        <div class="alert alert-warning">{{ session('message') }}</div>
    @endif

    <form method="POST" >
        @csrf

        <div class="mb-3">
            <label for="email">Adresse Email</label>
            <input type="email" name="email" class="form-control" required value="{{ old('email') }}">
        </div>

        <div class="mb-3">
            <label for="password">Mot de passe</label>
            <input type="password" name="password" class="form-control" required>
        </div>

        <button type="submit" class="btn btn-primary">Se connecter</button>
    </form>
</div>
@endsection
