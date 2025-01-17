import { useFormik } from 'formik';
import React, { useEffect } from 'react'
import { IoMail } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import Input from '../components/Input';
import { useForgetPasswordMutation } from '../store/auth';

const ForgotPassword = () => {
    const [ForgetPassword, { data, error, isLoading }] = useForgetPasswordMutation()

    const sent = false





    const EmailSchema = Yup.object().shape({
        email: Yup.string()
            .email('Invalid email')
            .required(' Email is Required'),
    });




    const PasswordSchema = Yup.object().shape({
        email: Yup.string().email('Invalid email').required('Email is Required'),
    });



    const formik = useFormik({
        initialValues: {
            email: '',
        },
        validationSchema: PasswordSchema,
        onSubmit: values => {
            handleSubmit(values)
        },
    });



    const handleSubmit = async (d) => {
        await ForgetPassword(d)
    }

    useEffect(() => {
        console.log(data)

    }, [data])


    return (

        <>
            {!data?.success ?
                <form onSubmit={formik.handleSubmit} className=' text-white max-w-md p-5 pb-5 w-full  rounded-lg bg-glass bg-gray-800 bg-opacity-50 flex justify-center items-center flex-col'>
                    <h1 className=' text-green-500 text-3xl font-semibold  mb-5'>Enter your email</h1>





                    <Input
                        icon={IoMail}
                        placeholder='Email'
                        id="email"
                        name="email"
                        type="email"
                        onChange={formik.handleChange}
                        value={formik.values.email}
                        msg={formik.errors.email}
                    />


                    {error ? <p className=" font-normal text-red-500">
                        {error?.data?.message}                </p> :
                        <h3 className=' self-start  mb-5 hover:underline text-white cursor-pointer'>A link will be sent to your email</h3>
                    }



                    <button type="submit" className=' w-full p-3 text-white bg-gradient-to-r from-emerald-600 to-emerald-400 hover:opacity-85 rounded-xl font-semibold'>send</button>


                </form>
                : <div
                    className=' text-white max-w-md p-5  w-full  rounded-lg bg-glass bg-gray-800 bg-opacity-50 flex justify-center items-center '
                >

                    A reset password link sent to your Email address
                </div>}</>
    )
}

export default ForgotPassword