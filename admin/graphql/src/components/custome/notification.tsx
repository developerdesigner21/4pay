"use client"
import { useState, useEffect, useRef } from 'react';
import Script from 'next/script'
import { initializeApp } from "firebase/app";
import { getMessaging, getToken } from "firebase/messaging";
import { useRouter } from 'next/router';
import { useNotifications_TokenMutation } from '@/graphql/user.graphql';

const firebaseConfig = {
    // apiKey: "AIzaSyDCJG4Qofv8thUCAnZfuw4ERfdiC3RxneI",
    // authDomain: "valid-logic-297506.firebaseapp.com",
    // projectId: "valid-logic-297506",
    // storageBucket: "valid-logic-297506.appspot.com",
    // messagingSenderId: "988071547876",
    // appId: "1:988071547876:web:357a0c9b7dffe83a72edf1",
    // measurementId: "G-1RL1GQHT5G"

    apiKey: "AIzaSyAjYKDoihsJImj70bSBAGfsUOLjpqoWptg",
    authDomain: "foodecomerce-14b6c.firebaseapp.com",
    projectId: "foodecomerce-14b6c",
    storageBucket: "foodecomerce-14b6c.appspot.com",
    messagingSenderId: "303436745611",
    appId: "1:303436745611:web:876716e4836cb23955fd8e",
    measurementId: "G-KVMY79NBVM"
};

export default function Home() {

    const audioRef:any = useRef(null);
    const router = useRouter();
    const [notifications_token] = useNotifications_TokenMutation();

    useEffect(() => {

        setInterval(() => {
        
            try {
                var myHeaders = new Headers();
                myHeaders.append("Content-Type", "application/json");
                myHeaders.append("Authorization", `Bearer ${JSON.parse(decodeURIComponent(Object.fromEntries(document.cookie.split('; ').map(item => item.split('='))).AUTH_CRED))['token']}`);

                var requestOptions: any = {
                    method: 'GET',
                    headers: myHeaders,
                    redirect: 'follow'
                };

                fetch("https://4pay.ai/backend/graphql?query=mutation Isorderalert {isorderalert(id: \"\") {orderalert}}", requestOptions)
                    .then(response => response.json())
                    .then(result => {
                        if (result.data.isorderalert.orderalert == 1) {
                            if (['/orders'].includes(router.pathname)) {
                                router.reload();
                            }else{
                                document.getElementById('orderalertplaybtn')?.click()
                            }
                        }else{
                            document.getElementById('orderalertpushbtn')?.click()
                        }
                    })
                    .catch(error => console.log('error', error));
            } catch (error) {
                console.log(error);
            }

        }, 5000);

        
        try {
            setTimeout(() => {
                // const app = initializeApp(firebaseConfig);
                // const messaging = getMessaging(app);
                Notification.requestPermission().then((permitions: any) => {
                    if (permitions == 'granted') {
                        firebase.initializeApp(firebaseConfig);
                        const messaging = firebase.messaging();
                        messaging.requestPermission().then(async() => {
    
                            const pnToken = await messaging.getToken();
                            notifications_token({
                                variables: {
                                    input:{token:pnToken}
                                },
                            });
                            
                            // TOkenNotificaiton(pnToken);
    
                        }).catch((error) => {
                            console.error('token Error:', error);
                        });

                    }
                })
            },500)
        } catch (error) {
            
        }

    }, [])

    function isclicksdsddsplay(){
        audioRef.current.play()
    }
    function isclicksdsddspush(){
        audioRef.current.pause()
    }

    return <>
        <div className='hidden'> 
            <Script src="https://www.gstatic.com/firebasejs/8.4.2/firebase-app.js" />
            <Script src="https://www.gstatic.com/firebasejs/7.16.1/firebase-messaging.js" />
            <audio ref={audioRef} controls loop><source src="https://4pay.ai/admin/alert/orderalert.mp3" type="audio/mpeg" /></audio>
            <button id='orderalertplaybtn' onClick={isclicksdsddsplay}>play</button>
            <button id='orderalertpushbtn' onClick={isclicksdsddspush}>push</button>
        </div>
    </>;
}
