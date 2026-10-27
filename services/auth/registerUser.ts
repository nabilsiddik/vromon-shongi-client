'use server'
import { zodValidator } from '@/lib/zodValidator';
import { userLogin } from './userLogin';
import { registerUserZodSchema } from '@/zod/auth.zodSchema';
import { serverFetch } from '@/lib/serverFetch';

export const registerUser = async (_currentState: any, formData: any): Promise<any> => {
    try {
        const payload = {
            firstName: formData.get("firstName"),
            lastName: formData.get("lastName"),
            email: formData.get("email"),
            password: formData.get("password"),
            confirmPassword: formData.get("confirmPassword"),
        };

        if (zodValidator(payload, registerUserZodSchema).success === false) {
            return zodValidator(payload, registerUserZodSchema);
        }

        const validatedPayload: any = zodValidator(payload, registerUserZodSchema)?.data;

        const registerData = {
            firstName: validatedPayload.firstName?.trim(),
            lastName: validatedPayload.lastName?.trim(),
            email: validatedPayload.email?.trim()?.toLowerCase(),
            password: validatedPayload.password,
        }

        const newFormData = new FormData()
        newFormData.append('data', JSON.stringify(registerData))

        const file = formData.get('file') || formData.get('profileImage');
        if (file && typeof file === 'object' && 'size' in file && (file as File).size > 0) {
            newFormData.append('file', file as Blob);
        }

        const res = await serverFetch.post('/user/create-user', {
            body: newFormData
        })

        const result = await res.json()

        if (result.success) {
            await userLogin(_currentState, formData);
        }

        return result

    } catch (error: any) {
        if (error?.digest?.startsWith('NEXT_REDIRECT')) {
            throw error
        }
        console.log('Error while registering user', error)
        return { success: false, message: `${process.env.NODE_ENV === 'development' ? error.message : "Registration Failed. Please try again."}` };
    }
}