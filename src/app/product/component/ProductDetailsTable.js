// components/ProductDetailsTable.js

export default function ProductDetailsTable() {
    const details = [
      { label: "Pelliculage", value: "-" },
      { label: "Vernis", value: "-" },
      { label: "Impression", value: "-" },
      { label: "Format", value: "-" },
      { label: "Papier", value: "-" },
      { label: "Quantité", value: "-" },
    ];
  
    return (
      <table className="w-full mt-6 text-sm border border-gray-200">
        <tbody>
          {details.map((item, index) => (
            <tr key={index} className="border-t border-gray-200">
              <td className="font-semibold p-2 w-1/3">{item.label}</td>
              <td className="p-2">{item.value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
  <div class="panel-group" id="accordion" role="tablist">

                
            

                <div class="panel panel-default panel-format" id="option-panel">
                    <div class="panel-heading" role="tab" id="heading-format" aria-expanded="true">
                        <h4 class="panel-title" style="font-weight: 600;display: inline;">
                            Format
                        </h4>
                        <img src="/files/skins/cfb4fd39-2077-4ba9-9bef-b4639b975999/images/interrogation.png" id="interrogation_modal" style="display: inline;">
                    </div>
                    <div id="collapseformat" class="panel-collapse collapse in" role="tabpanel">
                        <div class="panel-body">
                        <div class="option 10x15">
                            <div class="format-block selectedVal  10x15" id="selectedCard">
                                <label for="format10x15">
                                    <input class="display-none" type="checkbox" id="format10x15" name="format" value="10 x 15">
                                    <img src="https://api.weprint.ma/revendeurs_apiv2/public/storage/assets/picto/1748885230-683ddeeebde2f.png" width="100px" class="option-image" data-loaded="true">
                    
                                    <p>
                                        <span class="format-mesure">
                                            10 x 15
                                        </span>
                                    </p>
                        
                                </label>              
                            </div>
                        </div>
                    
                        <div class="option 10x21">
                            <div class="format-block selectedVal  10x21" id="selectedCard">
                                <label for="format10x21">
                                    <input class="display-none" type="checkbox" id="format10x21" name="format" value="10 x 21">
                                    <img src="https://api.weprint.ma/revendeurs_apiv2/public/storage/assets/picto/FLY_Format_100x210.png" width="100px" class="option-image" data-loaded="true">
                    
                                    <p>
                                        <span class="format-mesure">
                                            10 x 21
                                        </span>
                                    </p>
                        
                                </label>              
                            </div>
                        </div>
                    
                        <div class="option 15x15">
                            <div class="format-block selectedVal  15x15" id="selectedCard">
                                <label for="format15x15">
                                    <input class="display-none" type="checkbox" id="format15x15" name="format" value="15 x 15">
                                    <img src="https://api.weprint.ma/revendeurs_apiv2/public/storage/assets/picto/FLY_Format_150x150.png" width="100px" class="option-image" data-loaded="true">
                    
                                    <p>
                                        <span class="format-mesure">
                                            15 x 15
                                        </span>
                                    </p>
                        
                                </label>              
                            </div>
                        </div>
                    
                        <div class="option 15x21">
                            <div class="format-block selectedVal  15x21" id="selectedCard">
                                <label for="format15x21">
                                    <input class="display-none" type="checkbox" id="format15x21" name="format" value="15 x 21">
                                    <img src="https://api.weprint.ma/revendeurs_apiv2/public/storage/assets/picto/1748885284-683ddf2411051.png" width="100px" class="option-image" data-loaded="true">
                    
                                    <p>
                                        <span class="format-mesure">
                                            15 x 21
                                        </span>
                                    </p>
                        
                                </label>              
                            </div>
                        </div>
                    
                        <div class="option 21x30">
                            <div class="format-block selectedVal  21x30" id="selectedCard">
                                <label for="format21x30">
                                    <input class="display-none" type="checkbox" id="format21x30" name="format" value="21 x 30">
                                    <img src="https://api.weprint.ma/revendeurs_apiv2/public/storage/assets/picto/1748885295-683ddf2f6fd80.png" width="100px" class="option-image" data-loaded="true">
                    
                                    <p>
                                        <span class="format-mesure">
                                            21 x 30
                                        </span>
                                    </p>
                        
                                </label>              
                            </div>
                        </div>
                    </div>
                    </div>
                     <div id="ModalToShowImages" class="removed-item">
                         <div class="modal-bg">
                             <div class="Modal-heading">
                                <h2 id="OptionName">Format</h2>
                                <img src="/files/skins/cfb4fd39-2077-4ba9-9bef-b4639b975999/images/close-mockups.png" id="modal-fermer">
                             </div>
                            <div id="Modal-Body-Content"></div>
                        </div>
                     </div>
                    <div id="hover-part" class="hover-part"></div>
                </div>
            

                <div class="panel panel-default panel-papier" id="option-panel">
                    <div class="panel-heading" role="tab" id="heading-papier" aria-expanded="true">
                        <h4 class="panel-title" style="font-weight: 600;display: inline;">
                            Papier
                        </h4>
                        <img src="/files/skins/cfb4fd39-2077-4ba9-9bef-b4639b975999/images/interrogation.png" id="interrogation_modal" style="display: none">
                    </div>
                    <div id="collapsepapier" class="panel-collapse collapse in" role="tabpanel">
                        <div class="panel-body">
                        <div class="option ClassiqueBrillant135G">
                            <div class="format-block selectedVal  ClassiqueBrillant135G" id="selectedCard">
                                <label for="papierClassiqueBrillant135G">
                                    <input class="display-none" type="checkbox" id="papierClassiqueBrillant135G" name="papier" value="Classique Brillant 135G">
                                    <img src="https://api.weprint.ma/revendeurs_apiv2/public/storage/assets/picto/Options_Support_Brillant.png" width="100px" class="option-image" data-loaded="true">
                    
                                    <p>
                                        <span class="format-mesure">
                                            Classique Brillant 135G
                                        </span>
                                    </p>
                        
                                </label>              
                            </div>
                        </div>
                    
                        <div class="option ClassiqueBrillant170G">
                            <div class="format-block selectedVal  ClassiqueBrillant170G" id="selectedCard">
                                <label for="papierClassiqueBrillant170G">
                                    <input class="display-none" type="checkbox" id="papierClassiqueBrillant170G" name="papier" value="Classique Brillant 170G">
                                    <img src="https://api.weprint.ma/revendeurs_apiv2/public/storage/assets/picto/Options_Support_Brillant.png" width="100px" class="option-image" data-loaded="true">
                    
                                    <p>
                                        <span class="format-mesure">
                                            Classique Brillant 170G
                                        </span>
                                    </p>
                        
                                </label>              
                            </div>
                        </div>
                    
                        <div class="option ClassiqueBrillant250G">
                            <div class="format-block selectedVal  ClassiqueBrillant250G" id="selectedCard">
                                <label for="papierClassiqueBrillant250G">
                                    <input class="display-none" type="checkbox" id="papierClassiqueBrillant250G" name="papier" value="Classique Brillant 250G">
                                    <img src="https://api.weprint.ma/revendeurs_apiv2/public/storage/assets/picto/Options_Support_Brillant.png" width="100px" class="option-image" data-loaded="true">
                    
                                    <p>
                                        <span class="format-mesure">
                                            Classique Brillant 250G
                                        </span>
                                    </p>
                        
                                </label>              
                            </div>
                        </div>
                    
                        <div class="option ClassiqueBrillant300G">
                            <div class="format-block selectedVal  ClassiqueBrillant300G" id="selectedCard">
                                <label for="papierClassiqueBrillant300G">
                                    <input class="display-none" type="checkbox" id="papierClassiqueBrillant300G" name="papier" value="Classique Brillant 300G">
                                    <img src="https://api.weprint.ma/revendeurs_apiv2/public/storage/assets/picto/Options_Support_Brillant.png" width="100px" class="option-image" data-loaded="true">
                    
                                    <p>
                                        <span class="format-mesure">
                                            Classique Brillant 300G
                                        </span>
                                    </p>
                        
                                </label>              
                            </div>
                        </div>
                    
                        <div class="option ClassiqueMat135G">
                            <div class="format-block selectedVal  ClassiqueMat135G" id="selectedCard">
                                <label for="papierClassiqueMat135G">
                                    <input class="display-none" type="checkbox" id="papierClassiqueMat135G" name="papier" value="Classique Mat 135G">
                                    <img src="https://api.weprint.ma/revendeurs_apiv2/public/storage/assets/picto/Options_Support_BlancMat.png" width="100px" class="option-image" data-loaded="true">
                    
                                    <p>
                                        <span class="format-mesure">
                                            Classique Mat 135G
                                        </span>
                                    </p>
                        
                                </label>              
                            </div>
                        </div>
                    
                        <div class="option ClassiqueMat170G">
                            <div class="format-block selectedVal  ClassiqueMat170G" id="selectedCard">
                                <label for="papierClassiqueMat170G">
                                    <input class="display-none" type="checkbox" id="papierClassiqueMat170G" name="papier" value="Classique Mat 170G">
                                    <img src="https://api.weprint.ma/revendeurs_apiv2/public/storage/assets/picto/Options_Support_BlancMat.png" width="100px" class="option-image" data-loaded="true">
                    
                                    <p>
                                        <span class="format-mesure">
                                            Classique Mat 170G
                                        </span>
                                    </p>
                        
                                </label>              
                            </div>
                        </div>
                    
                        <div class="option ClassiqueMat250G">
                            <div class="format-block selectedVal  ClassiqueMat250G" id="selectedCard">
                                <label for="papierClassiqueMat250G">
                                    <input class="display-none" type="checkbox" id="papierClassiqueMat250G" name="papier" value="Classique Mat 250G">
                                    <img src="https://api.weprint.ma/revendeurs_apiv2/public/storage/assets/picto/Options_Support_BlancMat.png" width="100px" class="option-image" data-loaded="true">
                    
                                    <p>
                                        <span class="format-mesure">
                                            Classique Mat 250G
                                        </span>
                                    </p>
                        
                                </label>              
                            </div>
                        </div>
                    
                        <div class="option ClassiqueMat300G">
                            <div class="format-block selectedVal  ClassiqueMat300G" id="selectedCard">
                                <label for="papierClassiqueMat300G">
                                    <input class="display-none" type="checkbox" id="papierClassiqueMat300G" name="papier" value="Classique Mat 300G">
                                    <img src="https://api.weprint.ma/revendeurs_apiv2/public/storage/assets/picto/Options_Support_BlancMat.png" width="100px" class="option-image" data-loaded="true">
                    
                                    <p>
                                        <span class="format-mesure">
                                            Classique Mat 300G
                                        </span>
                                    </p>
                        
                                </label>              
                            </div>
                        </div>
                    
                        <div class="option Recyclé160G">
                            <div class="format-block selectedVal  Recyclé160G" id="selectedCard">
                                <label for="papierRecyclé160G">
                                    <input class="display-none" type="checkbox" id="papierRecyclé160G" name="papier" value="Recyclé 160G">
                                    <img src="https://api.weprint.ma/revendeurs_apiv2/public/storage/assets/picto/Options_Support_Recyclé.png" width="100px" class="option-image" data-loaded="true">
                    
                                    <p>
                                        <span class="format-mesure">
                                            Recyclé 160G
                                        </span>
                                    </p>
                        
                                </label>              
                            </div>
                        </div>
                    
                        <div class="option Recyclé250G">
                            <div class="format-block selectedVal  Recyclé250G" id="selectedCard">
                                <label for="papierRecyclé250G">
                                    <input class="display-none" type="checkbox" id="papierRecyclé250G" name="papier" value="Recyclé 250G">
                                    <img src="https://api.weprint.ma/revendeurs_apiv2/public/storage/assets/picto/Options_Support_Recyclé.png" width="100px" class="option-image" data-loaded="true">
                    
                                    <p>
                                        <span class="format-mesure">
                                            Recyclé 250G
                                        </span>
                                    </p>
                        
                                </label>              
                            </div>
                        </div>
                    </div>
                    </div>
                     <div id="ModalToShowImages" class="removed-item">
                         <div class="modal-bg">
                             <div class="Modal-heading">
                                <h2 id="OptionName">Papier</h2>
                                <img src="/files/skins/cfb4fd39-2077-4ba9-9bef-b4639b975999/images/close-mockups.png" id="modal-fermer">
                             </div>
                            <div id="Modal-Body-Content"></div>
                        </div>
                     </div>
                    <div id="hover-part" class="hover-part"></div>
                </div>
            

                <div class="panel panel-default panel-impression" id="option-panel">
                    <div class="panel-heading" role="tab" id="heading-impression" aria-expanded="true">
                        <h4 class="panel-title" style="font-weight: 600;display: inline;">
                            Impression
                        </h4>
                        <img src="/files/skins/cfb4fd39-2077-4ba9-9bef-b4639b975999/images/interrogation.png" id="interrogation_modal" style="display: inline;">
                    </div>
                    <div id="collapseimpression" class="panel-collapse collapse in" role="tabpanel">
                        <div class="panel-body">
                        <div class="option Recto">
                            <div class="format-block selectedVal  Recto" id="selectedCard">
                                <label for="impressionRecto">
                                    <input class="display-none" type="checkbox" id="impressionRecto" name="impression" value="Recto">
                                    <img src="https://api.weprint.ma/revendeurs_apiv2/public/storage/assets/picto/1749117426-684169f22e643.png" width="100px" class="option-image" data-loaded="true">
                    
                                    <p>
                                        <span class="format-mesure">
                                            Recto
                                        </span>
                                    </p>
                        
                                </label>              
                            </div>
                        </div>
                    
                        <div class="option RectoVerso">
                            <div class="format-block selectedVal  RectoVerso" id="selectedCard">
                                <label for="impressionRectoVerso">
                                    <input class="display-none" type="checkbox" id="impressionRectoVerso" name="impression" value="Recto Verso">
                                    <img src="https://api.weprint.ma/revendeurs_apiv2/public/storage/assets/picto/Options_Impression_RectoVerso.png" width="100px" class="option-image" data-loaded="true">
                    
                                    <p>
                                        <span class="format-mesure">
                                            Recto Verso
                                        </span>
                                    </p>
                        
                                </label>              
                            </div>
                        </div>
                    </div>
                    </div>
                     <div id="ModalToShowImages" class="removed-item">
                         <div class="modal-bg">
                             <div class="Modal-heading">
                                <h2 id="OptionName">Impression</h2>
                                <img src="/files/skins/cfb4fd39-2077-4ba9-9bef-b4639b975999/images/close-mockups.png" id="modal-fermer">
                             </div>
                            <div id="Modal-Body-Content"></div>
                        </div>
                     </div>
                    <div id="hover-part" class="hover-part"></div>
                </div>
            

                <div class="panel panel-default panel-pelliculage" id="option-panel">
                    <div class="panel-heading" role="tab" id="heading-pelliculage" aria-expanded="true">
                        <h4 class="panel-title" style="font-weight: 600;display: inline;">
                            Pelliculage
                        </h4>
                        <img src="/files/skins/cfb4fd39-2077-4ba9-9bef-b4639b975999/images/interrogation.png" id="interrogation_modal" style="display: inline;">
                    </div>
                    <div id="collapsepelliculage" class="panel-collapse collapse in" role="tabpanel">
                        <div class="panel-body">
                        <div class="option Sans">
                            <div class="format-block selectedVal  Sans" id="selectedCard">
                                <label for="pelliculageSans">
                                    <input class="display-none" type="checkbox" id="pelliculageSans" name="pelliculage" value="Sans">
                                    <img src="https://api.weprint.ma/revendeurs_apiv2/public/storage/assets/picto/Options_Sans.png" width="100px" class="option-image" data-loaded="true">
                    
                                    <p>
                                        <span class="format-mesure">
                                            Sans
                                        </span>
                                    </p>
                        
                                </label>              
                            </div>
                        </div>
                    </div>
                    </div>
                     <div id="ModalToShowImages" class="removed-item">
                         <div class="modal-bg">
                             <div class="Modal-heading">
                                <h2 id="OptionName">Pelliculage</h2>
                                <img src="/files/skins/cfb4fd39-2077-4ba9-9bef-b4639b975999/images/close-mockups.png" id="modal-fermer">
                             </div>
                            <div id="Modal-Body-Content"></div>
                        </div>
                     </div>
                    <div id="hover-part" class="hover-part"></div>
                </div>
            

                <div class="panel panel-default panel-vernis" id="option-panel">
                    <div class="panel-heading" role="tab" id="heading-vernis" aria-expanded="true">
                        <h4 class="panel-title" style="font-weight: 600;display: inline;">
                            Vernis
                        </h4>
                        <img src="/files/skins/cfb4fd39-2077-4ba9-9bef-b4639b975999/images/interrogation.png" id="interrogation_modal" style="display: inline;">
                    </div>
                    <div id="collapsevernis" class="panel-collapse collapse in" role="tabpanel">
                        <div class="panel-body">
                        <div class="option Sans">
                            <div class="format-block selectedVal  Sans" id="selectedCard">
                                <label for="vernisSans">
                                    <input class="display-none" type="checkbox" id="vernisSans" name="vernis" value="Sans">
                                    <img src="https://api.weprint.ma/revendeurs_apiv2/public/storage/assets/picto/Options_Sans.png" width="100px" class="option-image" data-loaded="true">
                    
                                    <p>
                                        <span class="format-mesure">
                                            Sans
                                        </span>
                                    </p>
                        
                                </label>              
                            </div>
                        </div>
                    </div>
                    </div>
                     <div id="ModalToShowImages" class="removed-item">
                         <div class="modal-bg">
                             <div class="Modal-heading">
                                <h2 id="OptionName">Vernis</h2>
                                <img src="/files/skins/cfb4fd39-2077-4ba9-9bef-b4639b975999/images/close-mockups.png" id="modal-fermer">
                             </div>
                            <div id="Modal-Body-Content"></div>
                        </div>
                     </div>
                    <div id="hover-part" class="hover-part"></div>
                </div>
            

                
            

                
            

                
            

                
            

                
            

                
            <div class="panel panel-default panel-qty" id="option-panel">
                    <div class="panel-heading" role="tab" id="heading-qty" aria-expanded="true">
                        <h4 class="panel-title" style="font-weight: 600;display: inline;">
                            Quantité
                        </h4>
                        <img src="/files/skins/cfb4fd39-2077-4ba9-9bef-b4639b975999/images/interrogation.png" id="interrogation_modal" style="display: none">
                    </div>
                    <div id="collapseqty" class="panel-collapse collapse in" role="tabpanel">
                        <div class="panel-body">
                            <div class="option 100">
                                <div class="format-block selectedVal 100">
                                    <label for="qty100">
                                        <input class="display-none" type="checkbox" id="qty100" name="qty" value="100">
                                        <p>
                                            <span class="format-mesure">
                                                100
                                            </span>
                                        </p>
                                    </label>
                                </div>
                            </div>
                        
                            <div class="option 200">
                                <div class="format-block selectedVal 200">
                                    <label for="qty200">
                                        <input class="display-none" type="checkbox" id="qty200" name="qty" value="200">
                                        <p>
                                            <span class="format-mesure">
                                                200
                                            </span>
                                        </p>
                                    </label>
                                </div>
                            </div>
                        
                            <div class="option 300">
                                <div class="format-block selectedVal 300">
                                    <label for="qty300">
                                        <input class="display-none" type="checkbox" id="qty300" name="qty" value="300">
                                        <p>
                                            <span class="format-mesure">
                                                300
                                            </span>
                                        </p>
                                    </label>
                                </div>
                            </div>
                        
                            <div class="option 400">
                                <div class="format-block selectedVal 400">
                                    <label for="qty400">
                                        <input class="display-none" type="checkbox" id="qty400" name="qty" value="400">
                                        <p>
                                            <span class="format-mesure">
                                                400
                                            </span>
                                        </p>
                                    </label>
                                </div>
                            </div>
                        
                            <div class="option 500">
                                <div class="format-block selectedVal 500">
                                    <label for="qty500">
                                        <input class="display-none" type="checkbox" id="qty500" name="qty" value="500">
                                        <p>
                                            <span class="format-mesure">
                                                500
                                            </span>
                                        </p>
                                    </label>
                                </div>
                            </div>
                        
                            <div class="option 600">
                                <div class="format-block selectedVal 600">
                                    <label for="qty600">
                                        <input class="display-none" type="checkbox" id="qty600" name="qty" value="600">
                                        <p>
                                            <span class="format-mesure">
                                                600
                                            </span>
                                        </p>
                                    </label>
                                </div>
                            </div>
                        
                            <div class="option 700">
                                <div class="format-block selectedVal 700">
                                    <label for="qty700">
                                        <input class="display-none" type="checkbox" id="qty700" name="qty" value="700">
                                        <p>
                                            <span class="format-mesure">
                                                700
                                            </span>
                                        </p>
                                    </label>
                                </div>
                            </div>
                        
                            <div class="option 800">
                                <div class="format-block selectedVal 800">
                                    <label for="qty800">
                                        <input class="display-none" type="checkbox" id="qty800" name="qty" value="800">
                                        <p>
                                            <span class="format-mesure">
                                                800
                                            </span>
                                        </p>
                                    </label>
                                </div>
                            </div>
                        
                            <div class="option 900">
                                <div class="format-block selectedVal 900">
                                    <label for="qty900">
                                        <input class="display-none" type="checkbox" id="qty900" name="qty" value="900">
                                        <p>
                                            <span class="format-mesure">
                                                900
                                            </span>
                                        </p>
                                    </label>
                                </div>
                            </div>
                        
                            <div class="option 1000">
                                <div class="format-block selectedVal 1000">
                                    <label for="qty1000">
                                        <input class="display-none" type="checkbox" id="qty1000" name="qty" value="1000">
                                        <p>
                                            <span class="format-mesure">
                                                1000
                                            </span>
                                        </p>
                                    </label>
                                </div>
                            </div>
                        
                            <div class="option 1500">
                                <div class="format-block selectedVal 1500">
                                    <label for="qty1500">
                                        <input class="display-none" type="checkbox" id="qty1500" name="qty" value="1500">
                                        <p>
                                            <span class="format-mesure">
                                                1500
                                            </span>
                                        </p>
                                    </label>
                                </div>
                            </div>
                        
                            <div class="option 2000">
                                <div class="format-block selectedVal 2000">
                                    <label for="qty2000">
                                        <input class="display-none" type="checkbox" id="qty2000" name="qty" value="2000">
                                        <p>
                                            <span class="format-mesure">
                                                2000
                                            </span>
                                        </p>
                                    </label>
                                </div>
                            </div>
                        
                            <div class="option 2500">
                                <div class="format-block selectedVal 2500">
                                    <label for="qty2500">
                                        <input class="display-none" type="checkbox" id="qty2500" name="qty" value="2500">
                                        <p>
                                            <span class="format-mesure">
                                                2500
                                            </span>
                                        </p>
                                    </label>
                                </div>
                            </div>
                        
                            <div class="option 3000">
                                <div class="format-block selectedVal 3000">
                                    <label for="qty3000">
                                        <input class="display-none" type="checkbox" id="qty3000" name="qty" value="3000">
                                        <p>
                                            <span class="format-mesure">
                                                3000
                                            </span>
                                        </p>
                                    </label>
                                </div>
                            </div>
                        
                            <div class="option 3500">
                                <div class="format-block selectedVal 3500">
                                    <label for="qty3500">
                                        <input class="display-none" type="checkbox" id="qty3500" name="qty" value="3500">
                                        <p>
                                            <span class="format-mesure">
                                                3500
                                            </span>
                                        </p>
                                    </label>
                                </div>
                            </div>
                        
                            <div class="option 4000">
                                <div class="format-block selectedVal 4000">
                                    <label for="qty4000">
                                        <input class="display-none" type="checkbox" id="qty4000" name="qty" value="4000">
                                        <p>
                                            <span class="format-mesure">
                                                4000
                                            </span>
                                        </p>
                                    </label>
                                </div>
                            </div>
                        
                            <div class="option 4500">
                                <div class="format-block selectedVal 4500">
                                    <label for="qty4500">
                                        <input class="display-none" type="checkbox" id="qty4500" name="qty" value="4500">
                                        <p>
                                            <span class="format-mesure">
                                                4500
                                            </span>
                                        </p>
                                    </label>
                                </div>
                            </div>
                        
                            <div class="option 5000">
                                <div class="format-block selectedVal 5000">
                                    <label for="qty5000">
                                        <input class="display-none" type="checkbox" id="qty5000" name="qty" value="5000">
                                        <p>
                                            <span class="format-mesure">
                                                5000
                                            </span>
                                        </p>
                                    </label>
                                </div>
                            </div>
                        
                            <div class="option 7500">
                                <div class="format-block selectedVal 7500">
                                    <label for="qty7500">
                                        <input class="display-none" type="checkbox" id="qty7500" name="qty" value="7500">
                                        <p>
                                            <span class="format-mesure">
                                                7500
                                            </span>
                                        </p>
                                    </label>
                                </div>
                            </div>
                        
                            <div class="option 10000">
                                <div class="format-block selectedVal 10000">
                                    <label for="qty10000">
                                        <input class="display-none" type="checkbox" id="qty10000" name="qty" value="10000">
                                        <p>
                                            <span class="format-mesure">
                                                10000
                                            </span>
                                        </p>
                                    </label>
                                </div>
                            </div>
                        
                            <div class="option 15000">
                                <div class="format-block selectedVal 15000">
                                    <label for="qty15000">
                                        <input class="display-none" type="checkbox" id="qty15000" name="qty" value="15000">
                                        <p>
                                            <span class="format-mesure">
                                                15000
                                            </span>
                                        </p>
                                    </label>
                                </div>
                            </div>
                        
                            <div class="option 20000">
                                <div class="format-block selectedVal 20000">
                                    <label for="qty20000">
                                        <input class="display-none" type="checkbox" id="qty20000" name="qty" value="20000">
                                        <p>
                                            <span class="format-mesure">
                                                20000
                                            </span>
                                        </p>
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                     <div id="ModalToShowImages" class="removed-item">
                         <div class="modal-bg">
                             <div class="Modal-heading">
                                <h2 id="OptionName">Quantité</h2>
                                <img src="/files/skins/cfb4fd39-2077-4ba9-9bef-b4639b975999/images/close-mockups.png" id="modal-fermer">
                             </div>
                            <div id="Modal-Body-Content"></div>
                        </div>
                     </div>
                    <div id="hover-part" class="hover-part"></div>
                </div></div>