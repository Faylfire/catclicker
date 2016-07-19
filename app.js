/*
var Cats = function(name, src){
  this.imgSrc = src;
  this.clicked = 0;
  this.name = name;

};

Cats.prototype.update = function(){
  this.clicked += 1;
};

var cats = ["//lh3.ggpht.com/nlI91wYNCrjjNy5f-S3CmVehIBM4cprx-JFWOztLk7vFlhYuFR6YnxcT446AvxYg4Ab7M1Fy0twaOCWYcUk=s0#w=640&amp;h=426",
           "//lh3.ggpht.com/kixazxoJ2ufl3ACj2I85Xsy-Rfog97BM75ZiLaX02KgeYramAEqlEHqPC3rKqdQj4C1VFnXXryadFs1J9A=s0#w=640&amp;h=496",
           "//www.mueezacats.com/wp-content/uploads/2015/07/3.jpg",
            "//farm9.staticflickr.com/8189/8104962690_82ccc9bc1a_o.jpg",
           "//magazine8.com/wp-content/uploads/2014/12/Why-Do-Cats-Meow-At-Night.jpg",
           "//s1.favim.com/610/2/Favim.com-cat-chubby-cute-meow-151738.jpg"];

var clickableCats = [];
for (cat in cats){
  var kitty = new Cats("Kitty"+cat, cats[cat]);
  clickableCats.push(kitty);
}

//console.log(clickableCats);

var $uCatList = $("<ul>", {id:"cuteCList"});



clickableCats.forEach( function(cat){
  var $div = $("<div>", {class: "cuteC"});
  $div.hide();
  var $imgdiv = $("<div>", {class: "imgCont"});
  var $img = $("<img>", {id:cat.name, class:"cuteCat", src:cat.imgSrc, alt:"Clickable Cats "+cat.name});
  var $cScoreDiv = $("<div>", {class:"clickerScore"});
  var $scoreH2 = $("<h2>", {id:cat.name+"Score", class:"score"});
  $scoreH2.text(cat.clicked);
  var $litem = $("<li>", {id:cat.name+"Litem", class:"cList"});
  $litem.text(cat.name);

  $litem.click(function(e){
    $(".cuteC").hide();
    $div.show();
  });

  $litem.on("mouseover", function(e){
    e.currentTarget.style.color = "orange";
    //e.currentTarget.style.border= "2px solid orangered";
  });

   $litem.on("mouseout", function(e){
    e.currentTarget.style.color = "steelblue";
    //e.currentTarget.style.border= "2px solid white";
  });

  $uCatList.append($litem);


  //adds onclick function to each of the images of the kitties.
  $img.click(function(e){
    var currScore = cat.clicked;
    var $score = $("#"+cat.name+"Score");
    cat.update();
    $score.text(currScore+1);
    //console.log(currScore);
  });

  //adds on mouseover and mouseout of the kitty images to indicate focus and ability to be clicked
  $img.on("mouseover", function(e){
    e.currentTarget.style.opacity = 0.9;
    e.currentTarget.style.border= "2px solid orangered";
  });

  $img.on("mouseout", function(e){
    e.currentTarget.style.opacity = 1;
    e.currentTarget.style.border= "2px solid white";
  });


  $imgdiv.append("<h2 class='title'>"+cat.name+"</h2>").append($img);
  $cScoreDiv.append("<h2>Clicked:</h2>");
  $cScoreDiv.append($scoreH2);
  $div.append($imgdiv).append($cScoreDiv);


  $(".container").append($div);
});

$(".sidebar").append($uCatList);
*/

$(function(){

  //Creates Cat objects for storing img Source and cat names
  var Cats = function(name, src){
    this.imgSrc = src;
    this.clicked = 0;
    this.name = name;
    this.selected=0;
  };

  Cats.prototype.update = function(){
    this.clicked += 1;
  };

  //List of urls of Cat images to be used
  // var cats = ["http://placekitten.com/g/600/350",
  // "http://placekitten.com/g/600/360",
  // "http://placekitten.com/g/600/400",
  // "http://placekitten.com/g/600/450",
  // "http://placekitten.com/g/550/350",
  // "http://placekitten.com/g/600/300",
  // ]

  var cats = ["http://placekitten.com/600/350",
  "http://placekitten.com/600/360",
  "http://placekitten.com/600/400",
  "http://placekitten.com/600/450",
  "http://placekitten.com/550/350",
  "http://placekitten.com/600/300",
  ]

//  $("body").append("Hello");

  //var testCat = new Cats("Marie", "http://marieclaire.media.ipcdigital.co.uk/11116/000090fb9/2b75_orh1000w646/cat-landscape-4.jpg");

  //localStorage.setItem('myCat', JSON.stringify(testCat));
  //var hello = JSON.parse(localStorage.getItem('myCat'));
  //console.log(hello)
  //$("body").append(hello);

  var catList = []; //List of CatNames also the serves as the ID of the cats could change to a real id
  var model = {
    init: function(){
      //$("body").append("HelloFrom Model");

      for (item in cats){
        var cat = new Cats("Kitty"+item, cats[item]);
        localStorage.setItem('Kitty'+item, JSON.stringify(cat));
        catList.push("Kitty"+item);
      }
      localStorage.setItem("catList", JSON.stringify(catList));

    },

    toggleSelect: function(catName){
      //$("body").append("HelloFrom M.update");
      var sCat = JSON.parse(localStorage.getItem(catName));
      if (sCat.selected === 1){
        sCat.selected = 0;
      } else {
        sCat.selected = 1;
      }

      localStorage.setItem(catName, JSON.stringify(sCat));

      return sCat;
    },

    getCat: function(catName){
      var cat = JSON.parse(localStorage.getItem(catName));
      return cat;
    },

    setCat: function(cat){
      localStorage.setItem(cat.name, JSON.stringify(cat));
    }




  };

  var octo = {
    init: function(){
      //$("body").append("Hello from Octo");
      //set up the list of cats call view.init(listofcats) which will set it up
      view.init();
      var catList = JSON.parse(localStorage.getItem("catList"));
      console.log(catList);
      catList.forEach(function(catName){
        view.makeButton(catName);
      });
    },

    drawCat: function(catName){
      var cat = model.getCat(catName);

      view.makeCat(cat);


    },

    updateClicked: function(catName){
      var sCat = model.getCat(catName);
      sCat.clicked += 1;
      model.setCat(sCat);
      return sCat.clicked;
    }





  };

  var view = {
    init: function(){
      //$("body").append("Hello from View");

    },

    makeButton: function(catName){
      //$("body").append("Hello from View.makeButton");
      var $button = $("<button/>",
      {
        type:"button",
        id:catName+"Button",
        class:"catButtons",
        text: catName,
        click: function() {
          $(".cuteC").remove();
          octo.drawCat(catName);
        }
      });
      $(".sidebar").append($button);
    },

    makeCat: function(cat){
      //$("body").append("Hello from View.makeCat");
      console.log(cat);
      var $div = $("<div>", {class: "cuteC"});
      //$div.hide();
      var $imgdiv = $("<div>", {class: "imgCont"});
      var $img = $("<img>", {id:cat.name, class:"cuteCat", src:cat.imgSrc, alt:"Clickable Cats "+cat.name});
      var $cScoreDiv = $("<div>", {class:"clickerScore"});
      var $scoreH2 = $("<h2>", {id:cat.name+"Score", class:"score"});
      $scoreH2.text(cat.clicked);
      $img.click(function(e){
        var currScore = octo.updateClicked(cat.name);
        var $score = $("#"+cat.name+"Score");
        $score.text(currScore);

      });
      $imgdiv.append("<h2 class='title'>"+cat.name+"</h2>").append($img);
      $cScoreDiv.append("<h2>Clicked:</h2>");
      $cScoreDiv.append($scoreH2);
      $div.append($imgdiv).append($cScoreDiv);


      $(".container").append($div);

    }



  };
  octo.init();
  //view.init();




});
