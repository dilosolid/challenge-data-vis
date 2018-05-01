var React = require('react')
// var linmap = require('linmap')
// var jsonist = require('jsonist')
var createReactClass = require('create-react-class')
var DrawDot = require('./DrawDot.jsx')
var DotDetails = require('./DotDetails.jsx')

var boxStyle = {
  position: 'relative',
  color: 'rgba(255, 255, 255, 0.7)',
  background: '#222',
  border: '1px solid black',
  boxShadow: '0px 3px 8px rgba(0, 0, 0, 0.5)',
  width: '0px',
  height: '0px'
}

module.exports = createReactClass({

  componentWillMount () {
    this.setWindowSize()
    this.setState({
      showDetails: false,
      allDots: this.generateDots()
    })
  },
  setWindowSize () {
    boxStyle.width = this.props.width
    boxStyle.height = this.props.height
  },
  showDotInfo (index, species, petalWidth, petalLength, sepalWidth, sepalLength) {
    if (index) {
      this.setState({
        showDetails: true,
        index,
        species,
        petalWidth,
        petalLength,
        sepalWidth,
        sepalLength
      })
    } else {
      this.setState({
        showDetails: false
      })
    }
  },
  generateDots () {
    window.fetch(this.props.dataset)
    .then((response) => {
      return response.json()
    })
    .then((dataset) => {
      let maxPetalLength = Math.max.apply(Math, dataset.map(item => item.petalLength))
      let minPetalLength = Math.min.apply(Math, dataset.map(item => item.petalLength))

      let maxPetalWidth = Math.max.apply(Math, dataset.map(item => item.petalWidth))
      let minPetalWidth = Math.min.apply(Math, dataset.map(item => item.petalWidth))

      let y = (maxPetalLength - minPetalLength) / 0.1
      let x = (maxPetalWidth - minPetalWidth) / 0.1

      let index = -1
      let allDots = dataset.map((item) => {
        index++
        return <DrawDot key={index}
          index={index}
          species={item.species}
          petalWidth={item.petalWidth}
          petalLength={item.petalLength}
          sepalWidth={item.sepalWidth}
          sepalLength={item.sepalLength}
          xPoints={x}
          yPoints={y}
          minPetalLength={minPetalLength}
          minPetalWidth={minPetalWidth}
          screenWidth={this.props.width}
          screenHeight={this.props.height}
          showDotInfo={this.showDotInfo}
                  />
      })

      this.setState({allDots})
    })
  },
  render () {
    return <div>
      <div style={boxStyle}>
        <DotDetails
          showDetails={this.state.showDetails}
          index={this.state.index}
          species={this.state.species}
          petalWidth={this.state.petalWidth}
          petalLength={this.state.petalLength}
          sepalWidth={this.state.sepalWidth}
          sepalLength={this.state.sepalLength} />
        { this.state.allDots }
      </div>
    </div>
  }

})
