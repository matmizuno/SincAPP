import React from "react";
import { StyleSheet } from "react-native";


const styles = StyleSheet.create({
    container:{
        width: '100%',
        height: '40%',
        display: 'flex',
        justifyContent: 'center',
        alignItems:'center',
 
      
       
    

    },
    tudo:{
        width: '100%',
        height: '100%',
    },

    
    retan:{
        width: '90%',
        height: '55%',
        backgroundColor: '#E3E3E3',
        display:'flex',
        flexDirection:'row',
        borderRadius: 15,
        marginTop: 20

    },
    saldo:{
        width: '50%',
padding: 15
    },

    txtSaldo:{
        fontSize: 18,
        color: "#242424"
    },
    title:{
        width:'90%',
        display:'flex',
        justifyContent:'center',
       fontSize: 25,
       color: "#242424"
    }
})

export default styles