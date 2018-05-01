var React = require('react')
var createReactClass = require('create-react-class')

module.exports = createReactClass({
  componentWillMount () {
    let position = this.position()
    let DotStyle = this.getDotStyle(position)

    this.setState({ DotBorder: {border: ''},
      DotStyle
    })
  },
  getDotStyle ({background, left, bottom}) {
    return {
      background,
      width: '10px',
      height: '10px',
      position: 'absolute',
      left,
      bottom,
      cursor: 'pointer',
      borderRadius: '5px'
    }
  },
  position () {
    let xSpacing = this.props.screenWidth / this.props.xPoints
    let ySpacing = this.props.screenHeight / this.props.yPoints

    let { petalWidth } = this.props
    let { minPetalWidth } = this.props
    let { petalLength } = this.props
    let { minPetalLength } = this.props

    let left = ((((petalWidth - minPetalWidth) * 10) * xSpacing) - 5) + 'px'
    let bottom = ((((petalLength - minPetalLength) * 10) * ySpacing) - 5) + 'px'
    let background = ''

    if (this.props.species === 'setosa') { background = '#ff7f0e' } else if (this.props.species === 'versicolor') { background = '#2ca02c' } else if (this.props.species === 'virginica') { background = '#1f77b4' }

    return {
      background,
      left,
      bottom
    }
  },
  showDotDetails () {
    let { index } = this.props
    let { species } = this.props
    let { petalWidth } = this.props
    let { petalLength } = this.props
    let { sepalWidth } = this.props
    let { sepalLength } = this.props

    let obj = {}
    Object.assign(obj, this.state.DotStyle)
    obj.border = '1px solid white'
    this.setState({ DotStyle: obj })
    this.props.showDotInfo(index,
                               species,
                               petalWidth,
                               petalLength,
                               sepalWidth,
                               sepalLength)
  },
  hideDotDetails () {
    let obj = {}
    Object.assign(obj, this.state.DotStyle)
    obj.border = ''
    this.setState({ DotStyle: obj })
    this.props.showDotInfo()
  },
  render () {
    return <div style={this.state.DotStyle}
      onMouseEnter={this.showDotDetails}
      onMouseLeave={this.hideDotDetails} />
  }
})
