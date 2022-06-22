# ZlcaClient

Một wrapper cho axios với một số tính năng được nâng cấp.

## Table of Contents

- Giới thiệu
- API Interfaces
- Các tính năng
- Ví dụ
- Phụ lục (nêu một số type tự định nghĩa và mục đích sử dụng của nó, các supporter ví dụ: logger, decryptor,...)
- Hướng phát triển trong tương lai (ví dụ: axiosCore sẽ được custom lại để tránh việc sử dụng axios (lib)....)

### 1. Giới thiệu

ZlcaClient được viết ra nhằm mục đích bổ sung thêm một tính năng cho thư viện axios và tích hợp một số nghiệp vụ cần thiết.
ZlcaClient bao gồm các module chính:

- `AxiosCore`: một wrapper cho axios (lib) được inject thêm logger, decryptor. AxiosCore được sử dụng nhằm mục đích là module gọi request với tham số là http request, trả về một raw response (được trả về từ axios lib).
- `AxiosEngine`: axiosEngine sẽ sử dụng axiosCore để thực hiện việc gọi request và nhận về response. Còn axiosEngine được tạo ra nhằm mục đích wrap thêm các business logic cho axiosCore. Ví dụ: thực hiện request với các retrySchema như thê nào, chuẩn hóa response, chuẩn hóa lỗi như thế nào,...
- `ZlcaClient`: zlcaClient được sử dụng là 'mặt ngoài' cho các lập trình viên sử dụng. zlcaClient sẽ chuẩn bị request, retrySchemas,... để cho axiosEngine xử lý, intercept các request (được quản lý bởi interceptor được inject vào trong axiosClient), generate các REST method cho các lập trình viên sử dụng. (_Hiện tại, đang để việc chuẩn hóa response, chuẩn hóa lỗi ở axiosEngine, đang xem xét để move các bước này sang cho axiosClient trong tương lai_.)

Ngoài ra, nó còn cần thêm một module khác: DetectNetwork để hỗ trợ việc phát hiện kết nối/ mất kết nối Internet. (DetectNetwork sẽ được giới thiệu thêm ở phần Phụ lục).

## 2. API Interfaces

### 2.1. ZlcaClient API

ZlcaClient API hiện tại sẽ có các interface về các REST method: `get` , `post`, `put`, `delete`. Ngoài ra sẽ có 2 interface để inject các dependency: `useInterceptor`, `useAxiosEngine`,...
Các REST method sẽ sử dụng chung một `request schema` để mô tả một request, `url` có thể là absolute hoặc relative (sẽ lấy base url được configure ở trong axiosClient).

```js script
ZlcaClient.get(url, requestSchema)
ZlcaClient.post(url, requestSchema)
ZlcaClient.put(url, requestSchema)
ZlcaClient.delete(url, requestSchema)

ZlcaClient.useInterceptor(interceptor)
ZlcaClient.useAxiosEngine(axiosEngine)
```

#### 2.1.1. Request Schema properties

Trong tương lai, một requestSchema object sẽ hướng tới việc hỗ trợ tất cả các property có thể có trong một request (của thư viện axios hỗ trợ). Nhưng hiện tại, request sẽ support một số property thông dụng của một request object và sẽ có thêm một số property để support các chức năng.

```js script
requestSchema = {
  //Start: các request property
  headers: {} //headers config,
  query: {
    id: '123',
  },
  body: {
    username: 'maitrungdong',
    password: '123',
  },
  //End: các request property. Trong tương lai sẽ support tất cả các property của AxiosRequest interface.
  isAbortable: true, // request có thể được abort hay không?
  shouldHold: true, // request có được hold khi mất kết nối internet hay không?
  waitNetworkTime: 60*1000, // khoảng thời gian đợi internet nếu như bị mất kết nối internet (đơn vị ms).
  retrySchemas: [], // mảng chứa các retrySchema object.
}
```
