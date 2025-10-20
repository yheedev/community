// app/(auth)/signup.tsx
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useRouter } from "expo-router";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { SafeAreaView, ScrollView } from "react-native";

import {
  Box,
  Button,
  ButtonText,
  FormControl,
  FormControlError,
  FormControlErrorText,
  FormControlLabel,
  FormControlLabelText,
  HStack,
  Input,
  InputField,
  Pressable,
  Text,
  VStack,
} from "@gluestack-ui/themed";

import { SignUpSchema, type SignUpInput } from "@/schemas/authSchema";

export default function SignUpScreen() {
  const router = useRouter();
  const [showPw, setShowPw] = useState(false);
  const [showPw2, setShowPw2] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
  } = useForm<SignUpInput>({
    resolver: zodResolver(SignUpSchema),
    mode: "onChange",
    defaultValues: { id: "", email: "", name: "", password: "", confirm: "" },
  });

  const onSubmit = async (data: SignUpInput) => {
    console.log("signup payload:", data);
    router.replace("/login");
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <ScrollView keyboardShouldPersistTaps='handled' contentContainerStyle={{ paddingBottom: 24 }}>
        <Box px='$6' pt='$8'>
          <VStack space='xs'>
            <Text size='2xl' bold color='$backgroundLight900'>
              회원가입
            </Text>
            <Text size='sm' color='$textLight500'>
              필수 정보를 입력해 주세요.
            </Text>
          </VStack>

          {/* 아이디 */}
          <FormControl isInvalid={!!errors.id} mt='$6'>
            <FormControlLabel>
              <FormControlLabelText color='$backgroundLight900'>아이디</FormControlLabelText>
            </FormControlLabel>
            <Controller
              control={control}
              name='id'
              render={({ field: { onChange, onBlur, value } }) => (
                <Input mt='$2' variant='outline' borderColor={errors.id ? "$red600" : "$borderLight200"} bg='$backgroundLight0'>
                  <InputField
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    autoCapitalize='none'
                    autoCorrect={false}
                    placeholder='예: hee_developer'
                  />
                </Input>
              )}
            />
            {errors.id && (
              <FormControlError mt='$2'>
                <FormControlErrorText>{errors.id.message}</FormControlErrorText>
              </FormControlError>
            )}
          </FormControl>

          {/* 이메일 */}
          <FormControl isInvalid={!!errors.email} mt='$4'>
            <FormControlLabel>
              <FormControlLabelText color='$backgroundLight900'>이메일</FormControlLabelText>
            </FormControlLabel>
            <Controller
              control={control}
              name='email'
              render={({ field: { onChange, onBlur, value } }) => (
                <Input mt='$2' variant='outline' borderColor={errors.email ? "$red600" : "$borderLight200"} bg='$backgroundLight0'>
                  <InputField
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    autoCapitalize='none'
                    autoCorrect={false}
                    keyboardType='email-address'
                    placeholder='example@email.com'
                  />
                </Input>
              )}
            />
            {errors.email && (
              <FormControlError mt='$2'>
                <FormControlErrorText>{errors.email.message}</FormControlErrorText>
              </FormControlError>
            )}
          </FormControl>

          {/* 이름 */}
          <FormControl isInvalid={!!errors.name} mt='$4'>
            <FormControlLabel>
              <FormControlLabelText color='$backgroundLight900'>이름</FormControlLabelText>
            </FormControlLabel>
            <Controller
              control={control}
              name='name'
              render={({ field: { onChange, onBlur, value } }) => (
                <Input mt='$2' variant='outline' borderColor={errors.name ? "$red600" : "$borderLight200"} bg='$backgroundLight0'>
                  <InputField value={value} onChangeText={onChange} onBlur={onBlur} autoCapitalize='none' autoCorrect={false} placeholder='이름' />
                </Input>
              )}
            />
            {errors.name && (
              <FormControlError mt='$2'>
                <FormControlErrorText>{errors.name.message}</FormControlErrorText>
              </FormControlError>
            )}
          </FormControl>

          {/* 비밀번호 */}
          <FormControl isInvalid={!!errors.password} mt='$4'>
            <FormControlLabel>
              <FormControlLabelText color='$backgroundLight900'>비밀번호</FormControlLabelText>
            </FormControlLabel>
            <Controller
              control={control}
              name='password'
              render={({ field: { onChange, onBlur, value } }) => (
                <Input mt='$2' variant='outline' borderColor={errors.password ? "$red600" : "$borderLight200"} bg='$backgroundLight0'>
                  <InputField
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    autoCapitalize='none'
                    autoCorrect={false}
                    secureTextEntry={!showPw}
                    placeholder='영문/숫자 포함, 8자 이상'
                  />
                </Input>
              )}
            />
            <Pressable
              onPress={() => setShowPw((v) => !v)}
              position='absolute'
              right='$3'
              top='$10'
              px='$2'
              py='$1'
              accessibilityLabel='비밀번호 보기 전환'
            >
              <Text color='$textLight500'>{showPw ? "숨김" : "보기"}</Text>
            </Pressable>
            {errors.password && (
              <FormControlError mt='$2'>
                <FormControlErrorText>{errors.password.message}</FormControlErrorText>
              </FormControlError>
            )}
          </FormControl>

          {/* 비밀번호 확인 */}
          <FormControl isInvalid={!!errors.confirm} mt='$4'>
            <FormControlLabel>
              <FormControlLabelText color='$backgroundLight900'>비밀번호 확인</FormControlLabelText>
            </FormControlLabel>
            <Controller
              control={control}
              name='confirm'
              render={({ field: { onChange, onBlur, value } }) => (
                <Input mt='$2' variant='outline' borderColor={errors.confirm ? "$red600" : "$borderLight200"} bg='$backgroundLight0'>
                  <InputField
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    autoCapitalize='none'
                    autoCorrect={false}
                    secureTextEntry={!showPw2}
                    placeholder='비밀번호 재입력'
                  />
                </Input>
              )}
            />
            <Pressable
              onPress={() => setShowPw2((v) => !v)}
              position='absolute'
              right='$3'
              top='$10'
              px='$2'
              py='$1'
              accessibilityLabel='비밀번호 확인 보기 전환'
            >
              <Text color='$textLight500'>{showPw2 ? "숨김" : "보기"}</Text>
            </Pressable>
            {errors.confirm && (
              <FormControlError mt='$2'>
                <FormControlErrorText>{errors.confirm.message}</FormControlErrorText>
              </FormControlError>
            )}
          </FormControl>

          {/* 제출/링크 */}
          <VStack mt='$6' space='sm'>
            <Button isDisabled={!isValid || isSubmitting} onPress={handleSubmit(onSubmit)}>
              <ButtonText>{isSubmitting ? "처리 중..." : "회원가입"}</ButtonText>
            </Button>

            <HStack justifyContent='center'>
              <Text size='sm' color='$textLight500'>
                이미 계정이 있으신가요?{" "}
                <Link href='/login' asChild>
                  <Text size='sm' color='$blue600'>
                    로그인하기
                  </Text>
                </Link>
              </Text>
            </HStack>
          </VStack>
        </Box>
      </ScrollView>
    </SafeAreaView>
  );
}

// import { zodResolver } from "@hookform/resolvers/zod";
// import { Link, useRouter } from "expo-router";
// import React, { useState } from "react";
// import { Controller, useForm } from "react-hook-form";
// import { SafeAreaView, ScrollView } from "react-native";

// import {
//   Box,
//   Button,
//   ButtonText,
//   FormControl,
//   FormControlError,
//   FormControlErrorText,
//   FormControlLabel,
//   FormControlLabelText,
//   HStack,
//   Input,
//   InputField,
//   Pressable,
//   Text,
//   VStack,
// } from "@gluestack-ui/themed";

// import { SignUpSchema, type SignUpInput } from "@/schemas/authSchema";

// export default function SignUpScreen() {
//   const router = useRouter();
//   const [showPw, setShowPw] = useState(false);
//   const [showPw2, setShowPw2] = useState(false);

//   const {
//     control,
//     handleSubmit,
//     formState: { errors, isValid, isSubmitting },
//   } = useForm<SignUpInput>({
//     resolver: zodResolver(SignUpSchema),
//     mode: "onChange",
//     defaultValues: { id: "", email: "", name: "", password: "", confirm: "" },
//   });

//   const onSubmit = async (data: SignUpInput) => {
//     // TODO: useMutation으로 API 연동
//     console.log("signup payload:", data);
//     router.replace("/login");
//   };

//   return (
//     <SafeAreaView className='flex-1 bg-white '>
//       <ScrollView keyboardShouldPersistTaps='handled' contentContainerStyle={{ paddingBottom: 24 }}>
//         <Box className='px-6 pt-8'>
//           <VStack className='space-y-2'>
//             <Text className='text-2xl font-bold text-zinc-900 dark:text-zinc-50'>회원가입</Text>
//             <Text className='text-sm text-zinc-500 dark:text-zinc-400'>필수 정보를 입력해 주세요.</Text>
//           </VStack>

//           {/* 아이디 */}
//           <FormControl isInvalid={!!errors.id} className='mt-6'>
//             <FormControlLabel>
//               <FormControlLabelText className='text-zinc-900 dark:text-zinc-50'>아이디</FormControlLabelText>
//             </FormControlLabel>
//             <Controller
//               control={control}
//               name='id'
//               render={({ field: { onChange, onBlur, value } }) => (
//                 <Input className='mt-2'>
//                   <InputField
//                     value={value}
//                     onChangeText={onChange}
//                     onBlur={onBlur}
//                     autoCapitalize='none'
//                     autoCorrect={false}
//                     placeholder='예: hee_developer'
//                     placeholderTextColor='#9AA6B2'
//                     className='text-[15px]'
//                   />
//                 </Input>
//               )}
//             />
//             {errors.id && (
//               <FormControlError>
//                 <FormControlErrorText className='text-red-600'>{errors.id.message}</FormControlErrorText>
//               </FormControlError>
//             )}
//           </FormControl>

//           {/* 이메일 */}
//           <FormControl isInvalid={!!errors.email} className='mt-4'>
//             <FormControlLabel>
//               <FormControlLabelText className='text-zinc-900 dark:text-zinc-50'>이메일</FormControlLabelText>
//             </FormControlLabel>
//             <Controller
//               control={control}
//               name='email'
//               render={({ field: { onChange, onBlur, value } }) => (
//                 <Input className='mt-2'>
//                   <InputField
//                     value={value}
//                     onChangeText={onChange}
//                     onBlur={onBlur}
//                     autoCapitalize='none'
//                     autoCorrect={false}
//                     keyboardType='email-address'
//                     placeholder='example@email.com'
//                     placeholderTextColor='#9AA6B2'
//                     className='text-[15px]'
//                   />
//                 </Input>
//               )}
//             />
//             {errors.email && (
//               <FormControlError>
//                 <FormControlErrorText className='text-red-600'>{errors.email.message}</FormControlErrorText>
//               </FormControlError>
//             )}
//           </FormControl>

//           {/* 이름 */}
//           <FormControl isInvalid={!!errors.name} className='mt-4'>
//             <FormControlLabel>
//               <FormControlLabelText className='text-zinc-900 dark:text-zinc-50'>이름</FormControlLabelText>
//             </FormControlLabel>
//             <Controller
//               control={control}
//               name='name'
//               render={({ field: { onChange, onBlur, value } }) => (
//                 <Input className='mt-2'>
//                   <InputField
//                     value={value}
//                     onChangeText={onChange}
//                     onBlur={onBlur}
//                     autoCapitalize='none'
//                     autoCorrect={false}
//                     placeholder='이름'
//                     placeholderTextColor='#9AA6B2'
//                     className='text-[15px]'
//                   />
//                 </Input>
//               )}
//             />
//             {errors.name && (
//               <FormControlError>
//                 <FormControlErrorText className='text-red-600'>{errors.name.message}</FormControlErrorText>
//               </FormControlError>
//             )}
//           </FormControl>

//           {/* 비밀번호 */}
//           <FormControl isInvalid={!!errors.password} className='mt-4'>
//             <FormControlLabel>
//               <FormControlLabelText className='text-zinc-900 dark:text-zinc-50'>비밀번호</FormControlLabelText>
//             </FormControlLabel>
//             <Controller
//               control={control}
//               name='password'
//               render={({ field: { onChange, onBlur, value } }) => (
//                 <Input className='mt-2'>
//                   <InputField
//                     value={value}
//                     onChangeText={onChange}
//                     onBlur={onBlur}
//                     autoCapitalize='none'
//                     autoCorrect={false}
//                     secureTextEntry={!showPw}
//                     placeholder='영문/숫자 포함, 8자 이상'
//                     placeholderTextColor='#9AA6B2'
//                     className='pr-10 text-[15px]'
//                   />
//                 </Input>
//               )}
//             />
//             <Pressable onPress={() => setShowPw((v) => !v)} className='absolute right-3 top-[50px] px-2 py-1' accessibilityLabel='비밀번호 보기 전환'>
//               <Text className='text-zinc-500'>{showPw ? "숨김" : "보기"}</Text>
//             </Pressable>
//             {errors.password && (
//               <FormControlError>
//                 <FormControlErrorText className='text-red-600'>{errors.password.message}</FormControlErrorText>
//               </FormControlError>
//             )}
//           </FormControl>

//           {/* 비밀번호 확인 */}
//           <FormControl isInvalid={!!errors.confirm} className='mt-4'>
//             <FormControlLabel>
//               <FormControlLabelText className='text-zinc-900 dark:text-zinc-50'>비밀번호 확인</FormControlLabelText>
//             </FormControlLabel>
//             <Controller
//               control={control}
//               name='confirm'
//               render={({ field: { onChange, onBlur, value } }) => (
//                 <Input className='mt-2'>
//                   <InputField
//                     value={value}
//                     onChangeText={onChange}
//                     onBlur={onBlur}
//                     autoCapitalize='none'
//                     autoCorrect={false}
//                     secureTextEntry={!showPw2}
//                     placeholder='비밀번호 재입력'
//                     placeholderTextColor='#9AA6B2'
//                     className='pr-10 text-[15px]'
//                   />
//                 </Input>
//               )}
//             />
//             <Pressable
//               onPress={() => setShowPw2((v) => !v)}
//               className='absolute right-3 top-[50px] px-2 py-1'
//               accessibilityLabel='비밀번호 확인 보기 전환'
//             >
//               <Text className='text-zinc-500'>{showPw2 ? "숨김" : "보기"}</Text>
//             </Pressable>
//             {errors.confirm && (
//               <FormControlError>
//                 <FormControlErrorText className='text-red-600'>{errors.confirm.message}</FormControlErrorText>
//               </FormControlError>
//             )}
//           </FormControl>

//           {/* 제출/하단 링크 */}
//           <VStack className='mt-6 space-y-3'>
//             <Button isDisabled={!isValid || isSubmitting} onPress={handleSubmit(onSubmit)} className={`${!isValid ? "opacity-60" : ""}`}>
//               <ButtonText>{isSubmitting ? "처리 중..." : "회원가입"}</ButtonText>
//             </Button>

//             <HStack className='justify-center'>
//               <Text className='text-sm text-zinc-500 dark:text-zinc-400'>
//                 이미 계정이 있으신가요?{" "}
//                 <Link href='/login' asChild>
//                   <Text className='text-sm text-blue-600'>로그인하기</Text>
//                 </Link>
//               </Text>
//             </HStack>
//           </VStack>
//         </Box>
//       </ScrollView>
//     </SafeAreaView>
//   );
// }
