import axios from 'axios';

export default {
    // Gets all things from database
    getStuff: function() {
        return axios.get('/api/example');
    },
    // Gets the thing with the given id
    getStuff: function(id) {
        return axios.get('/api/example/' + id);
    },
    // Deletes stuff with the given id
    deleteStuff: function(id) {
        return axios.delete('/api/example/' + id);
    },
    // Saves stuff to the database
    saveStuff: function(stuffData) {
        return axios.post('/api/example', stuffData);
    },
};
