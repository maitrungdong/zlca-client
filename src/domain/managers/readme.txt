Ta có thể gọi các manager là nơi quản lý data cho UI.

Tại đây, ta sẽ quản lý data cho store của chúng ta.
(Store chỉ là nơi để ánh xạ data cho UI). Nó chỉ biết lưu data (đã được xử
lý) và bên phía UI lấy và sử dụng. Còn việc data bị biến đổi như thế nào thì
là do bên phía AuthManager này thực hiện.


Manager giống như là một cái kênh đánh chặn vậy đó. Nó là "cửa thành"
từ phía UI với Business data ở phía bên kia.
Ví dụ, có một tác vụ chạy ngầm (background) gì đó... 
Nó không thông qua manager, hay có thể nói cách khác là manager không quan tâm!!!
Thì không cần phải hiển thị lên UI. Rồi khi nào manager quan tâm (UI nhờ manager làm gì đó)
thì nó mới chạy xuống phía bên dưới để nó lấy!

Bên phải phân biệt ở chỗ. Nếu một service, hay một action nào đó. Mà nó không hay chưa ảnh hưởng
trực tiếp đến UI thì không cần nhờ manager nó làm giùm! (Đương nhiên, nếu nhờ thì thằng
manager nó sẽ làm thôi, nhưng nó sẽ không gửi lên UI cho đến khi nào cần thiết).
Còn nếu đã thực hiện một hành động nào đó, ảnh hưởng tới API ngay lập tức thì phải thông qua
manager!!!

[ISSUES]: Nếu chúng ta chỉ cho thằng redux store là nơi để ánh xạ data UI.
thì chúng ta vẫn phải cần lấy dữ liệu của nó đúng không? Nhưng dữ liệu đó khi lấy
ra từ redux, thì nó là readonly... Nói chung thì mình phải clone ra và... bumb.
Khá lằng nhằng ở đây! 