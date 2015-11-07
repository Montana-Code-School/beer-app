var DATA = {
  "_id": "56338cbf714eab9aaa05b9a4",
  "__v": 1,
  "abv": "7.2",
  "brewery": "Great Burn Brewery",
  "category": "IPA",
  "ibu": "55",
  "image": "http://www.dramshopmt.com/wp-content/uploads/2015/08/Terminal-Gravity-eagle-Cap-IPA-600x800.jpeg",
  "location": "Missoula, MT",
  "name": "Rye IPA",
  "ratings": [
    {
      "overall": 3,
      "tasting_notes": [
        "malty",
        "strong"
      ]
    },
    {
      "overall": 4,
      "tasting_notes": [
        "malty",
        "strong"
      ]
    },
    {
      "overall": 2,
      "tasting_notes": [
        "malty",
        "strong"
      ]
    },
    {
      "overall": 1,
      "tasting_notes": [
        "malty",
        "strong"
      ]
    }
    ]
  
}

var sum=0;
  for(var i = 0; i < DATA.ratings.length; i++){
    var overall = DATA.ratings[i].overall;
   sum += DATA.ratings[i].overall;
    
}

    console.log(sum/DATA.ratings.length);

get beerId---->get overall ratings, add them and divide by the count---->put them on the image

