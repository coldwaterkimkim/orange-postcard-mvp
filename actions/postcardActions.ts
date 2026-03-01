'use server'

import { supabase } from '@/lib/supabase'

export async function submitPostcard(formData: FormData) {
    // Extract data from the form
    const message = formData.get('message') as string
    const receiverName = formData.get('receiverName') as string
    const receiverPhone = formData.get('receiverPhone') as string
    const receiverAddress = formData.get('receiverAddress') as string
    const senderName = formData.get('senderName') as string
    const senderPhone = formData.get('senderPhone') as string

    // Validate required fields (basic example)
    if (!message || !receiverName || !senderName) {
        return { error: '필수 항목을 모두 입력해주세요.' }
    }

    try {
        const { data, error } = await supabase
            .from('postcards')
            .insert([
                {
                    message,
                    receiver_name: receiverName,
                    receiver_phone: receiverPhone,
                    receiver_address: receiverAddress,
                    sender_name: senderName,
                    sender_phone: senderPhone,
                    status: 'pending' // or whatever your default status is
                }
            ])
            .select()

        if (error) {
            console.error('Supabase Error:', error)
            return { error: '엽서 등록 중 오류가 발생했습니다.' }
        }

        return { success: true, data }
    } catch (err) {
        console.error('Server Error:', err)
        return { error: '서버 오류가 발생했습니다.' }
    }
}
