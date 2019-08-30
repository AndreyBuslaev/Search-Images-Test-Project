import React from "react";
import "./App.css";

const URL = "https://strikedrop.com/api/product";
const IMAGE_URL_PREFIX = "https://strikedrop.com/assets/images/cases/sm/";

class CustomImagesComponent extends React.Component {
  render() {
    return <img src={this.props.data} className="img" alt=""></img>;
  }
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: []
    };
  }

  componentDidMount() {
    this.getImages();
  }

  getImages() {
    fetch(URL)
      .then(result => result.json())
      .then(result => {
        const mapped = result.result.productList.map(
          obl => IMAGE_URL_PREFIX + obl.imageUrl
        );
        return mapped;
      })
      .then(result => {
        this.setState({ data: result });
      });
  }

  render() {
    return (
      <div className="App">
        <header className="text-header">Search Images Test Project</header>
        <section className="row">
          <div className="column">
            {this.state.data.length > 0 ? (
              this.state.data.map(e => <CustomImagesComponent data={e} />)
            ) : (
              <h2>LOADING...</h2>
            )}
          </div>
        </section>
      </div>
    );
  }
}

export default App;
