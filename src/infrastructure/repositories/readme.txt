/**
 * [REPOSITORY]: là nơi trung tâm để quản lý các operation liên quan đến dữ liệu.
 * ví dụ: conversations, messages hay currConversation...
 * Nó sẽ nằm ở tầng infrastructure. Tầng infrastructure là tầng chịu trách nhiệm cho việc
 * giao tiếp với:
 * 1. BE (thông qua giao thức HTTP)
 * 2. Lưu trữ local data, ví dụ: sử dụng localStorage hay indexedDB...
 * 3. Store (State management - cache): vuex, redux, mobx,...
 */

/** [TODO]: Quản lý data liên quan đến messages.
 * ... Flow để lấy data: Cache (store) -> DB -> Network.
 */

/** [ISSUES]: Xuất hiện một vấn đề khi coi Redux là nơi để cache dữ liệu~
      * Redux có thực sự là một nơi để caching dữ liệu?
      * Hãy phân biệt giữa client state management (client state manager)
      * với server state management (server state manager - caching).
      * Bây giờ mình cứ tạm coi Redux (tức là store của chúng ta có thể caching dữ liệu đi!)
      * Mình sẽ đào bới lại vấn đề này sau...
      */
    /**
      * Kiểm tra trong cache coi có hay không!!!
      * Làm sao để kiểm tra? Thì đương nhiên phải chọc vào cache (hay một
      * store nào đó đang lưu trữ nó, trường hợp này là messagesStore).
      * Nhưng chúng ta đang gặp một vấn đề đó là:
      * Cái dữ liệu trong store của chúng ta maybe đang có một chỗ nào đó lắng nghe
      * Nhưng, cache lại bị full... Sau đó, mình thay thế dữ liệu trong cache --> Boombs...
      * Toang ngay!!! Vậy thì không ổn chút nào.
      */
Mỗi repo nó chỉ cache cái phần của riêng nó thôi!
Và nó phải giữ cho data độc lập nhất!!!
MessagesRepo thì cache data về message
ConversRepo thì cache data về conversation
Không được để ConversRepo cache data về conversation mà conver này lại chứa
thêm các messages của conversation...