import React from 'react';
import { StyleSheet, ScrollView, View, TextInput, Button, FlatList} from 'react-native';
import PlaceDetail from './src/components/PlaceDetail/PlaceDetail'
import ListItem from './src/components/ListItem/ListItem'

export default class App extends React.Component {
    state = {
        placeName: '',
        places: [],
        selectedPlace: null
    }

    placeNameChangeHandler = (val) => {
      this.setState({
          placeName: val
      })
    }

    placeSubmitHandler = () => {
      if(this.state.placeName.trim() === "") return;
      
      this.setState(prevState => {
        return {
          places: prevState.places.concat({
              key: Math.random(),
              name: prevState.placeName,
              image: {
                uri: "https://www.costarica.com/contentAsset/image/f989844e-960c-4cca-b9c2-87638dc2d18c/fileAsset/filter/Resize,Jpeg/resize_w/1000/Jpeg_q/x.8.pagespeed.ic.aU8XGzsoQJ.jpg"
              }
          })
        }
      })
    }

    placeSelectedHandler = (key) => {
        this.setState(prevState => {
            return {
                selectedPlace: prevState.places.find(place =>{
                    return place.key === key;
                })
            }
        })
        // this.setState(prevState =>{
        //     return {
        //         places: prevState.places.filter((place) =>{
        //             return place.key !== key;
        //         })
        //     }
        // });
    }

    placeDeletedHandler = () =>{
        this.setState(prevState =>{
            return {
                places: prevState.places.filter((place) =>{
                    return place.key !== prevState.selectedPlace.key;
                }),
                selectedPlace: null
            }
        });
    }

    modalClosedHandler = () => {
        this.setState({
            selectedPlace: null
        })
    }

  render() {
    // const placesOutput = this.state.places.map((place,i) => (
    // ));
    return (
      <View style = {styles.container}>
          <PlaceDetail selectedPlace={this.state.selectedPlace} onItemDeleted={this.placeDeletedHandler} onModalClosed={this.modalClosedHandler}/>
        <View style = {styles.inputContainer}>
            <TextInput
                style={styles.placeInput}
                placeholder="An awesome place"
                name={this.state.placeName}
                onChangeText={this.placeNameChangeHandler}
              />
            <Button
              style={styles.placeButton} 
              title="Add"
              onPress={this.placeSubmitHandler}
            />
        </View>
        <FlatList data={this.state.places} renderItem={(info)=> (
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
