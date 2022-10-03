// import { Card, FormInstance, Radio, RadioChangeEvent, Space } from 'antd';
// import styled from '@emotion/styled';
// import { CheckboxChangeEvent } from 'antd/lib/checkbox';
// import { CardInputWrapper, StripePaymentMethod } from './Payment/Method';
// import { down } from 'styled-breakpoints';

// interface PaymentMethodProps {
//   value?: any;
//   onChange?: (e: RadioChangeEvent) => void;
//   onSaveCardChange?: (e: CheckboxChangeEvent) => void;
//   form?: FormInstance;
// }

// export const PaymentMethod = ({
//   value,
//   onChange,
//   onSaveCardChange,
//   form,
// }: PaymentMethodProps) => {
//   return (
//     <PaymentMethodCard
//       title={
//         <span className="font-semibold text-base">{`Payment Method`}</span>
//       }
//       className="mt-6 md:mt-0 shadow-md"
//     >
//       <Radio.Group value={value} onChange={onChange} className="w-full">
//         <Space direction="vertical" className="my-3 font-title w-full">
//           {/* <Radio value="checkmo">Check/cash order</Radio> */}
//           <StripePaymentMethod
//             value={value}
//             onSaveCardChange={onSaveCardChange}
//             form={form}
//           />
//         </Space>
//       </Radio.Group>
//     </PaymentMethodCard>
//   );
// };

// const PaymentMethodCard = styled(Card)`
//   .ant-collapse-content-box {
//     ${down('md')} {
//       padding: 0;
//     }
//   }
//   .ant-checkbox-wrapper {
//     ${down('md')} {
//       margin-top: 12px;
//     }
//     span {
//       font-size: 14px;

//       ${down('md')} {
//         font-size: 12px;
//       }
//     }
//   }
//   .ant-card-body {
//     padding: 0 24px;

//     ${down('md')} {
//       padding: 0 8px;
//     }
//     .ant-radio-wrapper {
//       &-checked {
//         ${CardInputWrapper} {
//           height: auto;
//           .cart,
//           .StripeElement,
//           .card-holder-name {
//             opacity: 1;
//           }
//         }
//       }
//     }
//     .ant-form-item {
//       margin-bottom: 0;
//     }
//     .ant-collapse {
//       > .ant-collapse-item.ant-collapse-no-arrow > .ant-collapse-header {
//         padding: 0;
//       }
//       &-content {
//         .ant-radio-wrapper {
//           .ant-radio {
//             display: none;
//           }
//           > span:not(.ant-radio) {
//             .ant-card-meta {
//               &-title,
//               &-description {
//                 transition: all 0.3s ease-in;
//               }
//             }
//           }
//           &-checked {
//             > span:not(.ant-radio) {
//               > div:not(.ant-card-meta) {
//                 background: #f3f4f6;
//                 border: solid 1px var(--light-navy);
//               }
//               .ant-card-meta {
//                 background: #f3f4f6;
//                 border: solid 1px var(--light-navy);
//                 &-title {
//                   transition: all 0.3s ease-in;
//                   transform: translateX(4px);
//                 }
//                 &-description {
//                   transition: all 0.3s ease-in;
//                   transform: translateX(4px);
//                 }
//               }
//             }
//           }
//         }
//         .ant-card {
//           &-head {
//             padding: 0 8px;
//           }
//           &-body {
//             padding: 0;
//           }
//         }
//       }
//     }
//   }
// `;
