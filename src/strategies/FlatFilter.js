// Strategies/FlatFilter.js
export default class FlatFilter {
    filter(flats, filters) {
        return flats.filter(flat => {
            // Division/Location filter
            if (filters.location && filters.location !== 'all' && flat.division !== filters.location) {
                return false;
            }
            // Room count filter
            if (filters.room_count && filters.room_count !== 'all' && flat.room_count !== parseInt(filters.room_count)) {
                return false;
            }
            // Rental range filter
            if (filters.rent && filters.rent !== 'all') {
                const rent = parseFloat(flat.rentpermonth);
                if (filters.rent === 'twenty_thousand' && (rent < 15000 || rent > 20000)) return false;
                if (filters.rent === 'thirty_thousand' && (rent < 21000 || rent > 30000)) return false;
                if (filters.rent === 'forty_thousand' && (rent < 31000 || rent > 40000)) return false;
            }
            // Category filter
            if (filters.catagory && filters.catagory !== 'all' && flat.catagory !== filters.catagory) {
                return false;
            }
            return true;
        });
    }
}
