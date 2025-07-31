<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <!-- Dans le <head> -->
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet">

<!-- Avant </body> -->
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"></script>

    <title>Document</title>
    <style>
        .option-label:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
}

input[type="radio"]:checked + img {
    border: 2px solid #0d6efd;
}

        </style>
</head>
<body>
    
    <!-- resources/views/layouts/navbar.blade.php -->
<nav class="navbar navbar-expand-lg navbar-dark bg-dark">

    <div class="container-fluid">
      <a class="navbar-brand" href="{{ url('/') }}">MonSite</a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown">
        <span class="navbar-toggler-icon"></span>
      </button>
  
      <div class="collapse navbar-collapse" id="navbarNavDropdown">
        <ul class="navbar-nav ms-auto">
  @foreach ($categories as $categorie)
      
  <!-- Dropdown -->
  <li class="nav-item dropdown">
      <a class="nav-link dropdown-toggle active" href="#" id="navbarDropdownMenuLink" role="button"
      data-bs-toggle="dropdown" aria-expanded="false">
      {{$categorie->name_categorie}}
    </a>
    <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdownMenuLink">
        @foreach ($categorie->products as $product)
        <li><a class="dropdown-item" href="{{route('product.show',$product->id_product)}}">{{$product->name_product}}</a></li>
        @endforeach
    </ul>
</li>
@endforeach
  
          <!-- Auth Links (optionnel) -->
       
  
        </ul>
      </div>
    </div>
  </nav>
  <section>
    @yield('content') 
  </section>
  <footer>
    <h3>this is footer</h3>
  </footer>
    
</body>
</html>