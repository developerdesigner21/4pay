"use client"
import { useState, useEffect } from 'react';
import Script from 'next/script'
import NearShopCard from '@/components/ui/cards/near-shop';
import { notificationtoken } from "@/framework/author";

const firebaseConfig = {
    // apiKey: "AIzaSyByjYVQ3O1DOumrH1nE7FjyWYS0J1geXDc",
    // authDomain: "knockknock-544cd.firebaseapp.com",
    // projectId: "knockknock-544cd",
    // storageBucket: "knockknock-544cd.appspot.com",
    // messagingSenderId: "713670740363",
    // appId: "1:713670740363:web:6f7a50cce522875705c78e",
    // measurementId: "G-QJ912FE9QL"

    apiKey: "AIzaSyAjYKDoihsJImj70bSBAGfsUOLjpqoWptg",
    authDomain: "foodecomerce-14b6c.firebaseapp.com",
    projectId: "foodecomerce-14b6c",
    storageBucket: "foodecomerce-14b6c.appspot.com",
    messagingSenderId: "303436745611",
    appId: "1:303436745611:web:876716e4836cb23955fd8e",
    measurementId: "G-KVMY79NBVM"
};

export default function Home() {
    const {TOkenNotificaiton} = notificationtoken()

    useEffect(() => {
        try {
            Notification.requestPermission().then((permitions: any) => {
                if (permitions == 'granted') {
                    setTimeout(() => {
                        
                        firebase.initializeApp(firebaseConfig);
                        const messaging = firebase.messaging();
                        messaging.requestPermission().then(async() => {
    
                            const pnToken = await messaging.getToken();
                            TOkenNotificaiton(pnToken);
    
                        }).catch((error) => {
                            console.error('token Error:', error);
                        });
                    }, 1000);
                }
            })
        } catch (error) {
            console.log(error);
        }

    }, [])

    return <>
    <Script src="https://www.gstatic.com/firebasejs/8.4.2/firebase-app.js" />
    <Script src="https://www.gstatic.com/firebasejs/7.16.1/firebase-messaging.js" />
    </>;
}


export function Locationwiseshop(){

    const [Ischackloc, setIschackloc] = useState(false)
    const [ShopList, setShopList] = useState([])

    useEffect(() => {
        
        navigator.geolocation.getCurrentPosition(showPosition);
        function showPosition(position: any) {
            if (position.coords.latitude && position.coords.longitude) {
                  
                fetch(`${process.env.NEXT_PUBLIC_REST_API_ENDPOINT}/near-by-shop/${position.coords.latitude}/${position.coords.longitude}`, {method: 'GET'})
                    .then(response => response.json())
                    .then(result => {
                        setIschackloc(result.length?true:false);
                        setShopList(result)
                    })
                    .catch(error => console.log('error', error));
            }
        }
    }, [])

    return <>
        {Ischackloc?
            <div className="flex w-full flex-col px-2 pb-[40px] lg:px-7 xl:px-10 xl:pb-[54px] 3xl:pb-[60px]">
                <h3 className="mb-8 text-2xl font-bold text-heading">Near Shop</h3>
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-2 2xl:grid-cols-4">
                {ShopList.map((shop:any) => (
                    <NearShopCard key={shop.id} shop={shop} />
                ))}
                </div>
            </div>
        :''}
    </>;
}