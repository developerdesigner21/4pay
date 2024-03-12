
import { Form } from '@/components/ui/form/form';
import Button from '@/components/ui/button';
import {
    useModalAction,
} from '@/components/ui/modal/modal.context';
import Input from '@/components/ui/input';
import { useEffect, useState } from 'react';

import TextArea from '@/components/ui/text-area';
import React from 'react';
import { useRouter } from 'next/router';



type FormValues = {
    title: any;
    description: any;
    image: any;
};
const CustomerBanView = (isId: any) => {
    const { closeModal } = useModalAction();
    const [token, setToken] = useState();
    const { query } = useRouter()
    console.log("", closeModal)

    function onSubmit({ title, description, image }: FormValues) {

        var myHeaders = new Headers();
        myHeaders.append("Authorization", "key=AAAA5g2nU-Q:APA91bEooT-t0NWxaE_jpgXy-Hpkf35TZs3k7N9yR43fP3OPzl6jSFd0DSfZRpcuNPVJiuaCLGgTlFOqitJHKDjD8et_WbUNnFYMLz1CY74pGuVwA5-4H0dwGzgEXphA1QxlbKHlVB5h");
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
            "token": token,
            "to": token,
            "notification": {
                "title": title,
                "body": description
            }
        });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };
        fetch("https://fcm.googleapis.com/fcm/send", requestOptions)
            .then(response => response.json())
            .then(result => console.log(result))
            .catch(error => console.log('error', error));

        closeModal();
    }

    useEffect(() => {
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer 500|7K4iZjKj31x2CtiwiONOF9pfxMqfiKqmyS66LE1Id8c3b834");

        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };

        const dfsdv = 8;
        fetch(`https://4pay.ai/backend/graphql?query=query User{user(id:"${query.id}"){notification_token}}`, requestOptions)
            .then(response => response.json())
            .then(result => {
                setToken(result.data.user.notification_token)
            })
            .catch(error => console.log('error', error));
    })

    return (
        <Form<FormValues>
            onSubmit={onSubmit} >
            {({ register, formState: { errors } }) => (
                <div className="p-5 bg-light flex flex-col m-auto max-w-sm w-full rounded sm:w-[24rem]">
                    <p className='text-center text-lg'>Notification</p>
                    <Input
                        label={'Title'}
                        {...register('title')}
                        // "
                        variant="outline"
                        className="mb-4"
                    />
                    <TextArea
                        label={'Description'}
                        {...register('description')}
                        variant="outline"
                        className="mb-4"
                    />
                    <Input
                        label={'Image'}
                        {...register('image')}
                        variant="outline"
                        className="mb-5"
                    />
                    <div className='flex justify-center'>
                        <Button className='bg-[red] hover:bg-[red]' onClick={closeModal}>Cancel</Button>
                        <Button className='mx-5'>Submit</Button>
                    </div>
                </div>
            )}
        </Form>
    );
};

export default CustomerBanView;
