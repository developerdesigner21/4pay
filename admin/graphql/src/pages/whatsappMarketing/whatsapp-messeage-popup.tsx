
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
import { Menu, Transition } from '@headlessui/react';



type FormValues = {
    message: any;
};
const CustomerBanView = (isId: any) => {

    const { closeModal } = useModalAction();
    const [token, setToken] = useState();
    const { query } = useRouter()
    const data = useModalAction()
    const [selectedOption, setSelectedOption] = useState('');
    console.log("", closeModal)
    console.log("selectedOption", selectedOption);
    let nameKey = 'Hello_World'


    function onSubmit({ message }: FormValues) {

        var myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer EAAM2RClA1xcBOZCTVfjI8EdhqEeY7EJ8I7GgMTPCATbOtd3OwN0FSUoeBb4HzJS9KtNaMMhXZAZCkwqjuEBqFMA1cXFZAoKl5NZBNrcEjKLBaKF6Ee0lLsP92l1V4QmhDW1AYPJyiDy8BsmCuKtkBdQO04iToBSjioBXnJZA5zCg1WECJOxmL5zKE5aP26CZBO9DNiPK8qS8ZAZAlpOBfJvMZD");
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
            "messaging_product": "whatsapp",
            "to": query.phone,
            "type": "template",
            "template": {
                "name": selectedOption,
                "language": {
                    "code": "en_US"
                }
            }
        });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };
        fetch("https://graph.facebook.com/v18.0/261480377040588/messages", requestOptions)
            .then(response => response.json())
            .then(result => console.log(result))
            .catch(error => console.log('error', error));

        closeModal();
    }

    // useEffect(() => {
    //     var myHeaders = new Headers();

    //     myHeaders.append("Authorization", "Bearer EAAM2RClA1xcBOZCTVfjI8EdhqEeY7EJ8I7GgMTPCATbOtd3OwN0FSUoeBb4HzJS9KtNaMMhXZAZCkwqjuEBqFMA1cXFZAoKl5NZBNrcEjKLBaKF6Ee0lLsP92l1V4QmhDW1AYPJyiDy8BsmCuKtkBdQO04iToBSjioBXnJZA5zCg1WECJOxmL5zKE5aP26CZBO9DNiPK8qS8ZAZAlpOBfJvMZD");

    //     var requestOptions = {
    //         method: 'GET',
    //         headers: myHeaders,
    //         redirect: 'follow'
    //     };

    //     fetch(`https://graph.facebook.com/v18.0/261480377040588/messages`, requestOptions)
    //         .then(response => response.json())
    //         .then(result => {
    //             setToken(result.data.user.notification_token)
    //         })
    //         .catch(error => console.log('error', error));
    // })


    const handleSelectChange = (event: any) => {
        setSelectedOption(event.target.value);
    };
    return (
        <Form<FormValues>
            onSubmit={onSubmit} >
            {({ register, formState: { errors } }) => (
                <div className="p-5 bg-light flex flex-col m-auto max-w-sm w-full rounded sm:w-[24rem]">
                    <div>
                        <form className="max-w-sm mx-auto my-10">
                            <label htmlFor="countries" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Select an option</label>
                            <select value={selectedOption} onChange={handleSelectChange} id="countries" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                <option selected>Choose</option>
                                <option value="hello_world">hello_world</option>
                                <option value="Test">Test</option>
                            </select>
                        </form>
                    </div>

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
