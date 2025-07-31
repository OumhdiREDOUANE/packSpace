@extends('layout')
@section("content")

<div class="container mt-4">
    <h2 class="mb-4">Liste des commandes</h2>

    @foreach($orders as $order)
    <div class="card mb-3 shadow-sm">
        <div class="card-header d-flex justify-content-between align-items-center" style="cursor: pointer;" onclick="toggleDetails({{ $order->id_orderProduct }})">
            {{-- عرض اسم أول منتج --}}
            <strong>{{ $order->productOptions->first()->product->name_product ?? 'Produit' }}</strong>
        </div>

        <div id="details-{{ $order->id_orderProduct }}" class="card-body" style="display: none;">
            <div class="row">
                @foreach($order->productOptions as $productOption)
                    <div class="col-md-6 mb-3">
                        <div class="border rounded p-2">
                            <p class="mb-1"><strong>Propriétaire:</strong> {{ $productOption->option->proprieter->name_proprieter ?? 'N/A' }}</p>
                            <p class="mb-1"><strong>Option:</strong> {{ $productOption->option->name_option }}</p>
                            
                        </div>
                    </div>
                @endforeach
            </div>
        </div>
    </div>
@endforeach
@if($orders->isNotEmpty())
<div class="text-end mt-4">
    <button class="btn btn-primary" onclick="showLoginForm()">Valider Panier</button>
</div>

@endif
<div id="login-form" class="mt-4" style="display:none;">
    <h4>Connectez-vous pour valider le panier</h4>
    <form method="POST" action="{{ route('valider.panier') }}" >
        @csrf
        <div class="mb-3">
            <label for="email" class="form-label">Adresse Email</label>
            <input type="email" name="email" class="form-control" required>
        </div>
        
        <div class="mb-3">
            <label for="password" class="form-label">Mot de passe</label>
            <input type="password" name="password" class="form-control" required>
        </div>

        <button type="submit" class="btn btn-success">Se connecter</button>
    </form>
</div>

</div>

<script>
    function toggleDetails(id) {
        const el = document.getElementById('details-' + id);
        el.style.display = (el.style.display === 'none') ? 'block' : 'none';
    }
    function showLoginForm() {
        document.getElementById('login-form').style.display = 'block';
        window.scrollTo({ top: document.getElementById('login-form').offsetTop, behavior: 'smooth' });
    }
</script>



@endsection