
const handleImage = (req,res,db)=>{
    const {id} = req.body;
    db('users').where('id', '=', id)
    .increment('entries', 1)
    .returning('entries')
    .then(entries => {
        res.json(entries[0].entries);
    })
    .catch(err => res.status(400).json('unable to get entries'))
}

const Clarifai = require('clarifai');

const returnClarifaiRequestOptions = (imageUrl) => {

    const IMAGE_URL = imageUrl;
  
    const raw = JSON.stringify({
      "user_app_id": {
        "user_id": "k3eec8e6t828",
        "app_id": "test"
      },
      "inputs": [
          {
              "data": {
                  "image": {
                      "url": IMAGE_URL
                  }
              }
          }
      ]
    });
  
    const requestOptions = {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Authorization': 'Key ' + '9ebcc9ff80f84ef3a5ba793b7687fd87'
        },
        body: raw
    };
  
    return requestOptions;
}

const handleApiCall = (req, res) => {
    fetch(
      `https://api.clarifai.com/v2/models/face-detection/outputs`,
      returnClarifaiRequestOptions(req.body.input)
    )
      .then((response) => response.text())
      .then((result) => {
        res.json(result);
      })
      .catch((err) => res.status(500).json("Unable to communicate with API"));
  };


module.exports = {
    handleImage,
    handleApiCall
}

  