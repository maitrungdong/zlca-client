# ZlcaClient

Một wrapper cho thư viện axios với một số tính năng bổ sung.

## Table of Contents

- Giới thiệu
- API Interfaces
- Các tính năng
- Ví dụ
- Phụ lục (nêu một số type tự định nghĩa và mục đích sử dụng của nó, các supporter ví dụ: logger, decryptor, phần detect network...)
- Hướng phát triển trong tương lai (ví dụ: axiosCore sẽ được custom lại để tránh việc sử dụng axios (lib)....)

### 1. Giới thiệu

ZlcaClient được viết ra nhằm mục đích bổ sung thêm một tính năng cho thư viện axios và tích hợp một số nghiệp vụ cần thiết.
ZlcaClient bao gồm các module chính:

- `AxiosCore`: một wrapper cho thư viện axios được inject thêm logger, decryptor module. AxiosCore được sử dụng nhằm mục đích là một module gọi request với tham số là http request, trả về một raw response (được trả về từ thư viện axios). Logger được sử dụng để log lại request, decryptor được sử dụng để decrypt response trả về.
- `AxiosEngine`: AxiosEngine sẽ sử dụng AxiosCore để thực hiện việc gọi request và nhận về response. Còn AxiosEngine được tạo ra nhằm mục đích wrap thêm các business logic cho AxiosCore (Bởi vì bản thân AxiosCore nó chỉ nhận request và trả về một response). Ví dụ: thực hiện request với các retrySchema như thế nào, chuẩn hóa response, chuẩn hóa lỗi như thế nào, hold một response như thế nào... AxiosEngine sử dụng thêm waitRequestManager để quản lý cái request được hold lại khi bị mất kết nối Internet.
- `ZlcaClient`: ZlcaClient được sử dụng là 'mặt ngoài' cho các lập trình viên sử dụng. ZlcaClient sẽ chuẩn bị request, các retrySchema, (nó là nơi đặt các cấu hình mặc định như defaultRetrySchema, requestOptions,...)... để cho AxiosEngine xử lý, "đánh chặn" các request bị block (được quản lý bởi interceptor. Interceptor module được inject vào trong ZlcaClient), tạo trước các REST method cho các lập trình viên sử dụng. (_Hiện tại, đang để việc chuẩn hóa response, chuẩn hóa lỗi ở axiosEngine, đang xem xét việc di chuyển các bước này sang cho ZlcaClient trong tương lai_.)

Ngoài ra, nó còn cần thêm một module khác: DetectNetwork để hỗ trợ việc phát hiện kết nối/mất kết nối Internet. (DetectNetwork sẽ được giới thiệu thêm ở phần Phụ lục).

## 2. API Interfaces

### 2.1. ZlcaClient API

ZlcaClient API hiện tại sẽ có các interface về các REST method: `get` , `post`, `put`, `delete`. Ngoài ra sẽ có 2 interface để inject các dependency: `useInterceptor`, `useAxiosEngine`,...Lập trình viên sử dụng các REST method này để thực hiện việc gọi API. (Trong tương lai, sẽ support thêm các tính năng nữa theo yêu cầu của lập trình viên).
Các REST method ở trên sẽ sử dụng chung một `Request Schema` để mô tả một request, `url` có thể là absolute hoặc relative (sẽ lấy base url được configure ở trong ZlcaClient).

```js script
ZlcaClient.get(url, requestSchema)
ZlcaClient.post(url, requestSchema)
ZlcaClient.put(url, requestSchema)
ZlcaClient.delete(url, requestSchema)

//For dependency injection:
ZlcaClient.useInterceptor(interceptor)
ZlcaClient.useAxiosEngine(axiosEngine)
```

#### 2.1.1. Request Schema properties

Trong tương lai, một requestSchema object sẽ hỗ trợ tất cả các property có thể có trong một request (của thư viện axios hỗ trợ). Hiện tại, request schema sẽ support một số property thông dụng của một request object và sẽ có thêm một số property để support các chức năng mới.

```js script
requestSchema = {
  //Start: các request property
  requestConfig: {
    headers: {
      'Content-Type': 'application/json',
    }
    params: {
      id: '123',
    },
    data: {
      username: 'maitrungdong',
      password: '123',
    },
    timeout: 1000,
    withCredentials: false,
    responseType: 'json',
    maxContentLength: 2000,
    maxBodyLength: 2000,
  },
  //End: các request property. Trong tương lai sẽ support tất cả các property của AxiosRequest interface.
  isAbortable: true, // request có thể được abort hay không?
  shouldHold: true, // request có được hold khi mất kết nối internet hay không?
  waitNetworkTime: 60*1000, // khoảng thời gian đợi internet nếu như bị mất kết nối internet (đơn vị ms).
  retrySchemas: [], // mảng chứa các retrySchema object.
}
```
