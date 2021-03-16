import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import useMoneda from '../hooks/useMoneda';
import useCriptomoneda from '../hooks/useCriptomoneda';
import axios from 'axios';

const Boton = styled.input`
    margin-top:20px;
    font-weight: bold;
    font-size: 20px;
    padding:10px;
    background-color: #66a2fe;
    border:none;
    width:100%;
    border-radius:10px;
    color:#fff;
    transition: background-color .3s ease;

    &:hover{
        background-color: #326ac0;
        cursor: pointer;
    }
`;

const Formulario = () => {

    const MONEDAS = [
        {codigo:"USD", nombre: "Dolar de Estados Unidos"},
        {codigo:"MXN", nombre: "Peso Mexicano"},
        {codigo:"EUR", nombre: "Euro"},
        {codigo:"GBP", nombre: "Libra Esterlina"},
    ];

    //state del listado de criptomonedas
    const [listacripto,guardarCriptomonedas] = useState([]);

    //Utilizar moneda
    const [moneda,SelectMonedas] = useMoneda('Elige tu moneda','',MONEDAS);

    //Utiliar useCriptomoneda
    const [criptomoneda,SelectCripto] = useCriptomoneda('Elige tu Criptomoneda','',listacripto);

    const [error,guardarError] = useState(false);

    //Ejecutar llamado a la API
    useEffect(() => {
        const consultarAPI = async () => {
            const url = 'https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD';
            const resultado = await axios.get(url);
            guardarCriptomonedas(resultado.data.Data);
        }
        consultarAPI();
    },[]);

    //cuando el usuario hace submit
    const cotizarMoneda = (e) => {
        e.preventDefault();

        //Validar si ambos campos estan llenos 
        if(moneda === '' || criptomoneda ===''){
            guardarError(true);
            return;
        }

        guardarError(false);
    }

    return ( 
        <form
            onSubmit={cotizarMoneda}
            >
            {error ? 'Hay un error' : null}
            <SelectMonedas/>
            <SelectCripto/>
            <Boton
            type='submit'
            value='Calcular'
            />
        </form>
     );
}
 
export default Formulario;