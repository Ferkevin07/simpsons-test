import React from 'react';
import {useState, useEffect} from "react";
import { Button, Row, Col, Divider, Input, Form, message} from 'antd';


function Conect(){

    const[num, setNum]=useState(null)
    const[advice, setAdvice]=useState([]);
    const[favorite, setFavorite]=useState([])
    const[name, setName]=useState([])
    const[search, setSearch]=useState([])
    const[bandera,setBandera]=useState(false);

    useEffect(()=>{
        const getData= async()=>{
            if(num != null) {
                const response = await fetch("https://thesimpsonsquoteapi.glitch.me/quotes?count="+num);
                const result = await response.json();
                console.log("result", result);
                setAdvice(result);
            }

        }
        getData();
    },[num]);


    const handleSetFavorite=(tip, character)=> {
        setFavorite((prevState)=>[...prevState, tip]);
        setName((prevState)=>[...prevState, character])
    }

    const handleDeleteFavorite=(positionToDelete)=>{
        console.log("favorites",favorite.length);
        const newArray1=favorite.filter((array, favoritesPosition)=> favoritesPosition !== positionToDelete);
        setFavorite(newArray1);
    }

    const handleSetNum=()=>{
        const numero=document.getElementById("phrase");
        const pro=numero.options[numero.selectedIndex].value;
        console.log(pro)
        setNum(pro);
    }

    const handleNextAdvice=()=>{
        setNum(1)
    }

    const handleSearchByCharacter=()=>{
        const array=document.getElementById("character");
        const prox=array.options[array.selectedIndex].value;
        console.log(prox)
        const indice = name.indexOf(prox);
        setSearch(indice);
        setBandera(true);
        message.info('¡Si existe frase en tus favoritos de este personaje!');
    }

    return(
        <>
            <h1>SIMPSONS</h1>
            <Row>
                <Col span={12}>
                    <label htmlFor="cars">Elige cuantas frases deseas:</label>
                    <select name="option" id="phrase">
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                    </select>
                    <br/>
                    <button onClick={ handleSetNum }> INICIAR </button>
                    <tbody>
                    {
                        advice.map((advice, index)=>(
                            <tr key={index}>
                                <h4><img src={advice.image} alt="" height="200px"/></h4>
                                <td><h4>{advice.character}</h4>
                                <h4>{advice.quote}</h4></td>

                                <td>
                                    <Button onClick={ ()=> handleSetFavorite(advice.quote, advice.character) } >añadir de favoritos</Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                    <br/>
                    <Button onClick={ ()=> handleNextAdvice() } >Siguiente consejo</Button>
                </Col>
                <Col>
                    <h1>CONSEJOS FAVORITOS</h1>
                    <tbody>
                    {
                        favorite.map((favorite, index)=>(
                            <tr key={index}>
                                <td><h4>{favorite}</h4></td>
                                <td><h4>{name[index]}</h4></td>
                                <td>
                                    <Button onClick={ ()=>handleDeleteFavorite(index) } >Eliminar de favoritos</Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Col>
                <Col>
                    <h1>BUSCAR POR PERSONAJE</h1>
                    <select name="option1" id="character">
                        <option value="Bart Simpson">Bart Simpson</option>
                        <option value="Lisa Simpson">Lisa Simpson</option>
                        <option value="Homer Simpson">Homer Simpson</option>
                        <option value="Marge Simpson">Marge Simpson</option>
                        <option value="Milhouse">Milhouse</option>
                    </select>
                    <br/>
                    <button onClick={handleSearchByCharacter} > BUSCAR </button>
                    <tbody>
                    {
                        favorite.map((favorite, index)=>(
                            <tr key={index}>
                                <td><h4>{favorite[search]}</h4></td>
                                <td><h4>{name[search]}</h4></td>
                            </tr>
                        ))}
                    </tbody>
                </Col>
            </Row>
        </>
    )
}
export default Conect;