import React from 'react';
import { StyleSheet, ScrollView, View, TextInput, Button, FlatList} from 'react-native';
import PlaceDetail from './src/components/PlaceDetail/PlaceDetail'
import ListItem from './src/components/ListItem/ListItem'
import { connect } from "react-redux";
import { addPlace,deletePlace,selectPlace,deselectPlace } from "./src/store/actions/index";

class App extends React.Component {

    placeNameChangeHandler = (val) => {
      this.setState({
          placeName: val
      })
    }

    placeSubmitHandler = (placeName) => {
      this.props.onAddPlace(placeName);
    }

    placeSelectedHandler = (key) => {
        this.props.onSelectPlace(key);
    }

    placeDeletedHandler = () =>{
        this.props.onDeletePlace();
    }

    modalClosedHandler = () => {
        this.props.onDeselectPlace();
    }

  render() {
    return (
      <View style = {styles.container}>
          <PlaceDetail selectedPlace={this.props.selectedPlace} onItemDeleted={this.placeDeletedHandler} onModalClosed={this.modalClosedHandler}/>
        <View style = {styles.inputContainer}>
            <TextInput
                style={styles.placeInput}
                placeholder="An awesome place"
                name={this.props.placeName}
                onChangeText={this.placeNameChangeHandler}
              />
            <Button
              style={styles.placeButton} 
              title="Add"
              onPress={this.placeSubmitHandler}
            />
        </View>
        <FlatList data={this.props.places} renderItem={(info)=> (
            <ListItem placeName={info.item.name} onItemPressed={()=> this.placeSelectedHandler(info.item.key)} placeImage={info.item.image}/>
        )}>
        </FlatList>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 35,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
    inputContainer: {
    // flex: 1,
    width: "100%",
    flexDirection: 'row',
    justifyContent:'space-between',
    alignItems: "center"
    },
    placeInput: {
      width: "70%"
    },
    placeButton: {
      width: "30%"
    },
    listContainer: {
      width: "100%"
    }
});

const mapStateToProps = state => {
    return {
      places: state.places.places,
      selectedPlace: state.places.selectedPlace
    };
  };
  
  const mapDispatchToProps = dispatch => {
    return {
      onAddPlace: name => dispatch(addPlace(name)),
      onDeletePlace: () => dispatch(deletePlace()),
      onSelectPlace: key => dispatch(selectPlace(key)),
      onDeselectPlace: () => dispatch(deselectPlace())
    };
  };
  
  export default connect(mapStateToProps, mapDispatchToProps)(App);