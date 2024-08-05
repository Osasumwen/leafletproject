// Import GeoJSON data
import { geojsonData } from './data.js'; // Adjust the path if needed

// Initialize the map
const map = L.map('map').setView([40.70079245, -73.79541986849551], 14);

// Set up the OpenStreetMap layer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '© OpenStreetMap contributors',
}).addTo(map);

// Sample prices data
const prices = [
  { zip: '11418', year: 2015, median_sale_price: 429669.0469 },
  { zip: '11418', year: 2016, median_sale_price: 469145.3703703704 },
  { zip: '11418', year: 2017, median_sale_price: 523025.5208333333 },
  { zip: '11418', year: 2018, median_sale_price: 579421.9298245613 },
  { zip: '11418', year: 2019, median_sale_price: 615172.8333333334 },
  { zip: '11418', year: 2020, median_sale_price: 610757.6470588235 },
  { zip: '11418', year: 2021, median_sale_price: 643523.9583333334 },
  { zip: '11418', year: 2022, median_sale_price: 658179.1666666666 },
  { zip: '11418', year: 2023, median_sale_price: 644666.6666666666 },
  { zip: '11418', year: 2024, median_sale_price: 608609.375 },
  { zip: '11419', year: 2015, median_sale_price: 463803.4259259259 },
  { zip: '11419', year: 2016, median_sale_price: 495437.3977272727 },
  { zip: '11419', year: 2017, median_sale_price: 563682.3095238095 },
  { zip: '11419', year: 2018, median_sale_price: 593644.1860465116 },
  { zip: '11419', year: 2019, median_sale_price: 653505.3191489362 },
  { zip: '11419', year: 2020, median_sale_price: 650910.7142857143 },
  { zip: '11419', year: 2021, median_sale_price: 697801.3780487805 },
  { zip: '11419', year: 2022, median_sale_price: 760290.6976744186 },
  { zip: '11419', year: 2023, median_sale_price: 755503.8815789474 },
  { zip: '11419', year: 2024, median_sale_price: 739615.3846153846 },
  { zip: '11423', year: 2015, median_sale_price: 421595.9459459459 },
  { zip: '11423', year: 2016, median_sale_price: 416035.71428571426 },
  { zip: '11423', year: 2017, median_sale_price: 478839.62264150946 },
  { zip: '11423', year: 2018, median_sale_price: 512830.1603773585 },
  { zip: '11423', year: 2019, median_sale_price: 565674.9807692308 },
  { zip: '11423', year: 2020, median_sale_price: 602803.9215686275 },
  { zip: '11423', year: 2021, median_sale_price: 606165.0192307692 },
  { zip: '11423', year: 2022, median_sale_price: 672485.8490566037 },
  { zip: '11423', year: 2023, median_sale_price: 626166.6666666666 },
  { zip: '11423', year: 2024, median_sale_price: 681391.8888888889 },
  { zip: '11432', year: 2015, median_sale_price: 483684.2105263158 },
  { zip: '11432', year: 2016, median_sale_price: 560546.3636363636 },
  { zip: '11432', year: 2017, median_sale_price: 616183.0508474576 },
  { zip: '11432', year: 2018, median_sale_price: 671800.7692307692 },
  { zip: '11432', year: 2019, median_sale_price: 663382.783 },
  { zip: '11432', year: 2020, median_sale_price: 643837.5094339623 },
  { zip: '11432', year: 2021, median_sale_price: 719344.3396226416 },
  { zip: '11432', year: 2022, median_sale_price: 701684.2018 },
  { zip: '11432', year: 2023, median_sale_price: 770096.4912280702 },
  { zip: '11432', year: 2024, median_sale_price: 784470.5882352941 },
  { zip: '11433', year: 2015, median_sale_price: 381028.75 },
  { zip: '11433', year: 2016, median_sale_price: 382632.2111111111 },
  { zip: '11433', year: 2017, median_sale_price: 445768.45098039217 },
  { zip: '11433', year: 2018, median_sale_price: 507169.7 },
  { zip: '11433', year: 2019, median_sale_price: 538420.1923076923 },
  { zip: '11433', year: 2020, median_sale_price: 602728.641 },
  { zip: '11433', year: 2021, median_sale_price: 612206.5217391305 },
  { zip: '11433', year: 2022, median_sale_price: 645593.75 },
  { zip: '11433', year: 2023, median_sale_price: 650302.3461538461 },
  { zip: '11433', year: 2024, median_sale_price: 652389.0625 },
  { zip: '11435', year: 2015, median_sale_price: 353555.3888888889 },
  { zip: '11435', year: 2016, median_sale_price: 362389.5938 },
  { zip: '11435', year: 2017, median_sale_price: 421326.2105263158 },
  { zip: '11435', year: 2018, median_sale_price: 483031.4035087719 },
  { zip: '11435', year: 2019, median_sale_price: 513655.4576271186 },
  { zip: '11435', year: 2020, median_sale_price: 541792.4107142857 },
  { zip: '11435', year: 2021, median_sale_price: 581209.8214285715 },
  { zip: '11435', year: 2022, median_sale_price: 576332.9537037037 },
  { zip: '11435', year: 2023, median_sale_price: 575283.8813559322 },
  { zip: '11435', year: 2024, median_sale_price: 569238.1842105263 },
];

// Define a color scale based on average prices
const colorScale = d3
  .scaleSequential(d3.interpolateYlOrRd)
  .domain([0, 1000000]); // Adjust based on the data range

// Function to style each feature
function style(feature) {
  const year = document.getElementById('timeSlider').value;
  const zip = feature.properties.postalCode; // Assuming 'postalCode' is the correct property name
  const price =
    prices.find((d) => d.zip === zip && d.year === parseInt(year))
      ?.median_sale_price || 0;

  return {
    fillColor: colorScale(price),
    weight: 2,
    opacity: 1,
    color: 'white',
    dashArray: '3',
    fillOpacity: 0.7,
  };
}

// Create a GeoJSON layer and add it to the map
const geojsonLayer = L.geoJSON(geojsonData, {
  style: style,
}).addTo(map);

// Update the map when the slider is moved
document.getElementById('timeSlider').addEventListener('input', (event) => {
  document.getElementById('timeLabel').innerText = event.target.value;
  geojsonLayer.setStyle(style); // Apply the new style to all features
});
