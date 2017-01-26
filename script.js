
function domobj(){
  var self        =this;
  self.products   = [];

  self.getproducts = function(url){
    $.getJSON(url, function(response){
        for(i=0; i<response.sales.length ; i++){
          self.products.push( new productobj(response.sales[i], i)  );
        }
        self.updateproducthtml();
    });
  }

    
  self.updateproducthtml = function(){
      $.get('product-template.html', function(template){
          
       for( i=0; i< self.products.length ; i++){
      self.products[i].updatehtml(template);
    }
          self.updatedom();
          
      });
    
    
  }
  
  self.updatedom = function(){
     
    var i=0
    thishtml='';
      
    for( i=0; i< self.products.length ; i++){
      if (i % 3 == 0 ){  thishtml += "<div> "; console.log("START") }
      thishtml += self.products[i].htmlview;
      if ((i % 3 == 2) || i == (self.products.length-1) ){thishtml += "</div>";console.log("FINISH")}
    
    }
    $("#content").append(thishtml)
    //hiding loading screen once dom is rendered
    $('#loading').hide();
  }
  
}

function closeDiv(id){
   
    $(id).hide('slow', function(){ $(id).remove(); });
}

function productobj(product, i){
  var self          = this;
  self.photo        = product.photos.medium_half
  self.title        = product.name
  self.tagline      = product.tagline
  self.url          = product.url
  self.description  = product.description
  self.htmlview     = ""
  self.index        = i
  self.custom_class = ""
  
  self.updatehtml= function(template){
  
      self.htmlview = template.replace('{image}', self.photo).replace('{title}', self.title).replace('{tagline}', self.tagline).replace('{url}', self.url).replace('{custom_class}', self.custom_class).replace('{Description}',self.description).replace('{id}',self.index).replace('{id}',self.index);
   // });
      
  }
}


var page=new domobj();
page.getproducts('data.json');

//setTimeout("console.log('building html');page.updateproducthtml();",10);
//setTimeout("page.updatedom()",20)
