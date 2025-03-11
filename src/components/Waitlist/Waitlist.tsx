import './Waitlist.css';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import Modal from '../Modal';
import { useAddToWaitlist } from '../../hooks';
import { Mail, SendHorizonal, User } from 'lucide-react';
import classNames from 'classnames';
import { getTheme } from '../../utils';

type Waitlist = {
    handleError?: (v: Error) => void;
    variant?: 'light' | 'dark'
}

export type WaitlistFormData = {
    name: string;
    email: string;
    honeypot: string;
};

function Waitlist({ handleError, variant }: Waitlist) {
    const { handleSubmit, formState, register, reset } = useForm<WaitlistFormData>({
        mode: 'onBlur'
    });
    const [showErrorModal, setShowErrorModal] = useState(false);
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const { error, loading, postAddToWaitlist } = useAddToWaitlist();

    const onSubmit = async (formData: WaitlistFormData) => {
        if (formData.honeypot !== '') {
            // Using a simple honeypot to avoid spam here.
            // Recaptcha is a more comprehensive and accessible solution but requires a more detailed setup
            if (handleError) {
                handleError(new Error('spam detected'))
            }
        } else {
            let response;
            if (!loading) {
                response = await postAddToWaitlist(formData);
            }

            if (response?.ok) {
                setShowSuccessModal(true);
                reset();
            } else {
                setShowErrorModal(true)
            }
        }
    };

    return (
        <div className={classNames("Container", `Container-${getTheme(variant)}`)}>
            <h2 className="Header">Join the Waitlist</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="Form">
                <div className="Inputs">
                    <div className="Honeypot-Input">
                        <label htmlFor="honeypot">Anti-spam measure. Don't fill this out if you're human:</label>
                        <input {...register('honeypot')} type="text" name="honeypot" />
                    </div>
                    <div className="Input">
                        <User className="InputIcon" />
                        <input
                            {...register('name', { required: true })}
                            type="text"
                            aria-label="Enter your name"
                            placeholder="Enter your name"
                        />
                    </div>
                    <div className="Error">{formState.errors?.name && 'Name is required'}</div>
                    <div className="Input">
                        <Mail className="InputIcon" />
                        <input
                            {...register('email', {
                                required: true,
                                pattern: {
                                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                    message: 'Invalid email address',
                                },
                            })}
                            type="email"
                            aria-label="Enter your email"
                            placeholder="Enter your email"
                        />
                    </div>
                    <div className="Error">
                        {!!formState.errors?.email ?
                            (formState.errors?.email.message || 'Email is required')
                            : ''
                        }
                    </div>
                </div>
                <button type="submit" disabled={!formState.isValid} className="Button">
                    Join Now
                </button>
            </form>
            <Modal
                isOpen={showSuccessModal}
                onClose={() => setShowSuccessModal(false)}
                children={
                    <div className="Modal-Content">
                        <div className="SendHorizonalIcon"><SendHorizonal /></div>
                        <h3>Thank you</h3>
                        You've been added to the waitlist!
                        <button className="Button" onClick={() => setShowSuccessModal(false)}>Close</button>
                    </div>
                }
            />
            <Modal
                isOpen={showErrorModal}
                onClose={() => setShowErrorModal(false)}
                children={
                    <div className="Modal-Content">
                        <h3>Oh no!</h3>
                        <p className="Modal-Error">
                            An error has occurred<br />
                            {error?.message}
                        </p>
                        <button className="Button" onClick={() => setShowErrorModal(false)}>Close</button>
                    </div>
                }
            />
        </div>
    );
}

export default Waitlist;
