@extends('layout')
@section("content")
<div class="container mt-4">
    <div class="row">
        <div class="col-3">
            <img src="{{ $product->image }}" class="img-fluid" alt="{{ $product->name_product }}">
        </div>

        <div class="col-9">
            <ul class="list-unstyled">
                <form method="POST" action="{{route('commande.store')}}" >
                    @csrf
                    <div class="container mt-4">
                        @foreach($groupedByProprietaire as $group)
    <li class="mb-4 list-unstyled">
        <h5 class="mb-3 text-primary">{{ $group['proprieter']->name_proprieter }}</h5>
        <div class="row">
            @foreach($group['options'] as $productOption)
                @php
                    $option = $productOption->option;
                    $groupName = "selected_option_" . $group['proprieter']->id_proprieter;
                    $isSelected = (old($groupName) ?? session($groupName)) == $productOption->id_ProductOption;
                @endphp
                <div class="col-md-4 col-sm-6 mb-4">
                    <label for="option-{{ $productOption->id_ProductOption }}" class="card h-100 shadow-sm border-2 {{ $isSelected ? 'border-primary' : 'border-darck' }} option-label" style="cursor:pointer; transition: 0.3s ease;">
                        <input 
                            type="radio" 
                            name="{{ $groupName }}" 
                            id="option-{{ $productOption->id_ProductOption }}" 
                            value="{{ $productOption->id_ProductOption }}" 
                            class="d-none" 
                            {{ $isSelected ? 'checked' : '' }}>
                        <img 
                            src="{{ $option->image_option }}" 
                            class="card-img-top rounded-top" 
                            alt="{{ $option->name_option }}" 
                            style="object-fit: cover; height: 200px;">
                        <div class="card-body text-center">
                            <h5 class="card-title">{{ $option->name_option }}</h5>
                        </div>
                    </label>
                </div>
            @endforeach
        </div>
    </li>
@endforeach

                
                        <div class="text-center mt-4">
                            <button type="submit" class="btn btn-primary px-4 py-2">
                                Valider votre choix
                            </button>
                        </div>
                    </div>
                </form>
                
            </ul>
        </div>
        
    </div>
</div>
@endsection
