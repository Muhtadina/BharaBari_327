// Strategy -> LocationFilter.js
export default class LocationFilter {
  filter(flats, location) {
    return flats.filter(f => f.location === location);
  }
}
