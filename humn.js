$("#json-four").change(function() {
  debugger
  d3.csv("pred.csv", function(csv){
    data={};
          csv.forEach(function(d) {
          if(d.player == this.value){
            data.h_pred = +d.h_pred;
            data.la_pred = +d.la_pred;
            data.ll_pred = +d.ll_pred;
            data.ua_pred = +d.ua_pred;
            data.ul_pred = +d.ul_pred;
            data.torso_pred = +d.torso_pred;      
            data.player = d.player;
            data.h_pred_proba = +d.h_pred_proba;
            data.la_pred_proba = +d.la_pred_proba;
            data.ll_pred_proba = +d.ll_pred_proba;
            data.ua_pred_proba = +d.ua_pred_proba;
            data.ul_pred_proba = +d.ul_pred_proba;
            data.torso_pred_proba = +d.torso_pred_proba;      
            }

            if(data.h_pred > 0) {
              Human.scene.getObject("human_02_male_muscular_system-right_craniofacial_muscles_ID").objects.map(function(p) {p.setHighlight(true)})
              Human.scene.getObject("human_02_male_muscular_system-right_craniofacial_muscles_ID").objects.map(function(p) {p.objects.map(function(x) {x.setHighlight(true)})})
              Human.scene.getObject("human_02_male_muscular_system-craniofacial_muscles_ID").objects.map(function(p) {p.setHighlight(true)})
              Human.scene.getObject("human_02_male_muscular_system-craniofacial_muscles_ID").objects.map(function(p) {p.objects.map(function(x) {x.setHighlight(true)})})
              Human.scene.getObject("human_02_male_muscular_system-right_proper_muscles_of_neck_ID").objects.map(function(p) {p.setHighlight(true)})
              Human.scene.getObject("human_02_male_muscular_system-right_proper_muscles_of_neck_ID").objects.map(function(p) {p.objects.map(function(x) {x.setHighlight(true)})})
              Human.scene.getObject("human_02_male_muscular_system-left_craniofacial_muscles_ID").objects.map(function(p) {p.setHighlight(true)})
              Human.scene.getObject("human_02_male_muscular_system-left_craniofacial_muscles_ID").objects.map(function(p) {p.objects.map(function(x) {x.setHighlight(true)})})
              Human.scene.getObject("human_02_male_muscular_system-left_proper_muscles_of_neck_ID").objects.map(function(p) {p.setHighlight(true)})
              Human.scene.getObject("human_02_male_muscular_system-left_proper_muscles_of_neck_ID").objects.map(function(p) {p.objects.map(function(x) {x.setHighlight(true)})})
      
            };
            if(data.ll_pred > 0) {
              Human.scene.getObject("human_02_male_muscular_system-lateral_compartment_muscles_of_left_lower_leg_ID").objects.map(function(p) {p.setHighlight(true)})
              Human.scene.getObject("human_02_male_muscular_system-lateral_compartment_muscles_of_left_lower_leg_ID").objects.map(function(p) {p.objects.map(function(x) {x.setHighlight(true)})})
              Human.scene.getObject("human_02_male_muscular_system-lateral_compartment_muscles_of_right_lower_leg_ID").objects.map(function(p) {p.setHighlight(true)})
              Human.scene.getObject("human_02_male_muscular_system-lateral_compartment_muscles_of_right_lower_leg_ID").objects.map(function(p) {p.objects.map(function(x) {x.setHighlight(true)})})
              Human.scene.getObject("human_02_male_muscular_system-posterior_compartment_muscles_of_left_lower_leg_ID").objects.map(function(p) {p.setHighlight(true)})
              Human.scene.getObject("human_02_male_muscular_system-posterior_compartment_muscles_of_left_lower_leg_ID").objects.map(function(p) {p.objects.map(function(x) {x.setHighlight(true)})})
              Human.scene.getObject("human_02_male_muscular_system-posterior_compartment_muscles_of_right_lower_leg_ID").objects.map(function(p) {p.setHighlight(true)})
              Human.scene.getObject("human_02_male_muscular_system-posterior_compartment_muscles_of_right_lower_leg_ID").objects.map(function(p) {p.objects.map(function(x) {x.setHighlight(true)})})
              Human.scene.getObject("human_02_male_muscular_system-anterior_compartment_muscles_of_left_lower_leg_ID").objects.map(function(p) {p.setHighlight(true)})
              Human.scene.getObject("human_02_male_muscular_system-anterior_compartment_muscles_of_left_lower_leg_ID").objects.map(function(p) {p.objects.map(function(x) {x.setHighlight(true)})})
              Human.scene.getObject("human_02_male_muscular_system-anterior_compartment_muscles_of_right_lower_leg_ID").objects.map(function(p) {p.setHighlight(true)})
              Human.scene.getObject("human_02_male_muscular_system-anterior_compartment_muscles_of_right_lower_leg_ID").objects.map(function(p) {p.objects.map(function(x) {x.setHighlight(true)})})    
            };
            if(data.ul_pred > 0) {
              Human.scene.getObject("human_02_male_muscular_system-posterior_compartment_muscles_of_left_thigh_ID").objects.map(function(p) {p.setHighlight(true)})
              Human.scene.getObject("human_02_male_muscular_system-posterior_compartment_muscles_of_left_thigh_ID").objects.map(function(p) {p.objects.map(function(x) {x.setHighlight(true)})})
              Human.scene.getObject("human_02_male_muscular_system-posterior_compartment_muscles_of_right_thigh_ID").objects.map(function(p) {p.setHighlight(true)})
              Human.scene.getObject("human_02_male_muscular_system-posterior_compartment_muscles_of_right_thigh_ID").objects.map(function(p) {p.objects.map(function(x) {x.setHighlight(true)})})
              Human.scene.getObject("human_02_male_muscular_system-anterior_compartment_muscles_of_left_thigh_ID").objects.map(function(p) {p.setHighlight(true)})
              Human.scene.getObject("human_02_male_muscular_system-anterior_compartment_muscles_of_left_thigh_ID").objects.map(function(p) {p.objects.map(function(x) {x.setHighlight(true)})})
              Human.scene.getObject("human_02_male_muscular_system-anterior_compartment_muscles_of_right_thigh_ID").objects.map(function(p) {p.setHighlight(true)})
              Human.scene.getObject("human_02_male_muscular_system-anterior_compartment_muscles_of_right_thigh_ID").objects.map(function(p) {p.objects.map(function(x) {x.setHighlight(true)})})    
                         };
            if(data.ua_pred > 0) {
              Human.scene.getObject("human_02_male_muscular_system-muscles_of_right_upper_arm_ID").objects.map(function(p) {p.setHighlight(true)})
              Human.scene.getObject("human_02_male_muscular_system-muscles_of_right_upper_arm_ID").objects.map(function(p) {p.objects.map(function(x) {x.setHighlight(true)})})
              Human.scene.getObject("human_02_male_muscular_system-muscles_of_left_upper_arm_ID").objects.map(function(p) {p.setHighlight(true)})
              Human.scene.getObject("human_02_male_muscular_system-muscles_of_left_upper_arm_ID").objects.map(function(p) {p.objects.map(function(x) {x.setHighlight(true)})})
            };
            if(data.la_pred > 0) {
              Human.scene.getObject("human_02_male_muscular_system-muscles_of_right_forearm_extensor_compartment_ID").objects.map(function(p) {p.setHighlight(true)})
              Human.scene.getObject("human_02_male_muscular_system-muscles_of_right_forearm_extensor_compartment_ID").objects.map(function(p) {p.objects.map(function(x) {x.setHighlight(true)})})
              Human.scene.getObject("human_02_male_muscular_system-muscles_of_right_forearm_flexor_compartment_ID").objects.map(function(p) {p.setHighlight(true)})
              Human.scene.getObject("human_02_male_muscular_system-muscles_of_right_forearm_flexor_compartment_ID").objects.map(function(p) {p.objects.map(function(x) {x.setHighlight(true)})})
              Human.scene.getObject("human_02_male_muscular_system-muscles_of_left_forearm_extensor_compartment_ID").objects.map(function(p) {p.objects.map(function(x) {x.setHighlight(true)})})
              Human.scene.getObject("human_02_male_muscular_system-muscles_of_left_forearm_extensor_compartment_ID").objects.map(function(p) {p.setHighlight(true)})
              Human.scene.getObject("human_02_male_muscular_system-muscles_of_left_forearm_flexor_compartment_ID").objects.map(function(p) {p.setHighlight(true)})
              Human.scene.getObject("human_02_male_muscular_system-muscles_of_left_forearm_flexor_compartment_ID").objects.map(function(p) {p.objects.map(function(x) {x.setHighlight(true)})})
            };
            if(data.torso_pred > 0) {
              Human.scene.getObject("human_02_male_muscular_system-right_muscles_of_abdomen_ID").objects.map(function(p) {p.setHighlight(true)})
              Human.scene.getObject("human_02_male_muscular_system-right_muscles_of_abdomen_ID").objects.map(function(p) {p.objects.map(function(x) {x.setHighlight(true)})})
              Human.scene.getObject("human_02_male_muscular_system-muscles_of_right_pectoral_girdle_ID").objects.map(function(p) {p.setHighlight(true)})
              Human.scene.getObject("human_02_male_muscular_system-muscles_of_right_pectoral_girdle_ID").objects.map(function(p) {p.objects.map(function(x) {x.setHighlight(true)})})
              Human.scene.getObject("human_02_male_muscular_system-muscles_of_right_shoulder_ID").objects.map(function(p) {p.setHighlight(true)})
              Human.scene.getObject("human_02_male_muscular_system-muscles_of_right_shoulder_ID").objects.map(function(p) {p.objects.map(function(x) {x.setHighlight(true)})})
              Human.scene.getObject("human_02_male_muscular_system-left_muscles_of_abdomen_ID").objects.map(function(p) {p.setHighlight(true)})
              Human.scene.getObject("human_02_male_muscular_system-left_muscles_of_abdomen_ID").objects.map(function(p) {p.objects.map(function(x) {x.setHighlight(true)})})
              Human.scene.getObject("human_02_male_muscular_system-muscles_of_left_pectoral_girdle_ID").objects.map(function(p) {p.setHighlight(true)})
              Human.scene.getObject("human_02_male_muscular_system-muscles_of_left_pectoral_girdle_ID").objects.map(function(p) {p.objects.map(function(x) {x.setHighlight(true)})})
              Human.scene.getObject("human_02_male_muscular_system-muscles_of_left_shoulder_ID").objects.map(function(p) {p.setHighlight(true)})
              Human.scene.getObject("human_02_male_muscular_system-muscles_of_left_shoulder_ID").objects.map(function(p) {p.objects.map(function(x) {x.setHighlight(true)})})
            
            };
          });
  });
});
$("#json-three").change(function() {
      
        var $dropdown = $(this);
       
        $.getJSON("data.json", function(data) {
        
          var key = $dropdown.val();
       
          var vals = [];
                    
          switch(key) {

            case "Sharks":
              vals = data.Sharks.split(",");
              break;

            case "Oilers":
              vals = data.Oilers.split(",");
              break;

            case "Islanders":
              vals = data.Islanders.split(",");
              break;

            case "Blue Jackets":
              vals = data["Blue Jackets"].split(",");
              break;

            case "Thrashers":
              vals = data.Thrashers.split(",");
              break;

            case "Rangers":
              vals = data.Rangers.split(",");
              break;

            case "Stars":
              vals = data.Stars.split(",");
              break;

            case "Canucks":
              vals = data.Canucks.split(",");
              break;

            case "Maple Leafs":
              vals = data["Maple Leafs"].split(",");
              break;

            case "Hurricanes":
              vals = data.Hurricanes.split(",");
              break;

            case "Coyotes":
              vals = data.Coyotes.split(",");
              break;

            case "Jets":
              vals = data.Jets.split(",");
              break;

            case "Sabres":
              vals = data.Sabres.split(",");
              break;

            case "Flames":
              vals = data.Flames.split(",");
              break;

            case "Capitals":
              vals = data.Capitals.split(",");
              break;

            case "Lightning":
              vals = data.Lightning.split(",");
              break;

            case "Penguins":
              vals = data.Penguins.split(",");
              break;

            case "Predators":
              vals = data.Predators.split(",");
              break;

            case "Flyers":
              vals = data.Flyers.split(",");
              break;

            case "Wild":
              vals = data.Wild.split(",");
              break;

            case "Red Wings":
              vals = data["Red Wings"].split(",");
              break;

            case "Senators":
              vals = data.Senators.split(",");
              break;

            case "Blackhawks":
              vals = data.Blackhawks.split(",");
              break;

            case "Devils":
              vals = data.Devils.split(",");
              break;

            case "Ducks":
              vals = data.Ducks.split(",");
              break;

            case "Avalanche":
              vals = data.Avalanche.split(",");
              break;

            case "Canadiens":
              vals = data.Canadiens.split(",");
              break;

            case "Kings":
              vals = data.Kings.split(",");
              break;

            case "Blues":
              vals = data.Blues.split(",");
              break;

            case "Panthers":
              vals = data.Panthers.split(",");
              break;

            case "Bruins":
              vals = data.Bruins.split(",");
              break;

            case 'base':
              vals = ['Please Select Player'];
          }

          $(this).hide();
          var $jsonfour = $("#json-four");
          $.each(vals, function(index, value) {
            $jsonfour.append("<option>" + value + "</option>");
          });
          $jsonfour.show();
          $('#player').show();
      
        });

});