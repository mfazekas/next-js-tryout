import mapboxgl from 'mapbox-gl'


mapboxgl.accessToken =
      "pk.eyJ1IjoiYW1nMjIwNzUiLCJhIjoiY2swajRlMno5MDZjMjNvbTF2MnRpNmd1biJ9.ADtpGBcPTJhWfSn2vWk07w"
  
export default
class Map extends React.Component {
  state = {
    loaded: false,
    third: false
  }
  componentDidMount() {
    let center = [140, 30];
    let zoom = 1;

    var map = new mapboxgl.Map({
      container: this.mapContainer,
      style: "mapbox://styles/amg22075/ckd9pg3720fig1itedelf8sy0",
      center,
      hash: "map",
      renderWorldCopies: true,
      zoom,
      maxZoom: 11.9,
      minZoom: 1,
      pitch: 0,
      bearing: 0,
      tolerance: 0,
      pitchWithRotate: false,
      dragRotate: true,
      interactive: true,
      attributionControl: false,
      localIdeographFontFamily: "'Noto Sans', 'Noto Sans CJK SC', sans-serif",
    })
    
    this.map = map

    map.on("load", () => {
      console.log("=> Loaded")
      this.setState({loaded: true})
    })

    setTimeout(() => {
      this.setState({third: true})
    }, 2000)
  }
  render() {
    let {loaded, third} = this.state;
    return (<div>
      This will be a mapbox map
      <div ref={el => (this.mapContainer = el)} class="relative w-full h-full">

      </div>
      <div id="second">Second</div>
      {third && <div id="third">Third</div>}
      {loaded && <div id="ready-to-screenshot">Loaded</div>}
    </div>);
  }
}
