Use case nó giống như là một cái service:
Xử lý các nghiệp vụ của ứng dụng. (Business application).
Nó có thể sẽ bao gồm nhiều công đoạn, chỉ để xử lý một cái gì đó từ phía trên
đem xuống. 
Nó có thể kết hợp giữa nhiều repo để thực hiện một service gì đó! Chẳng hạn.
Khi thực hiện xong thì đem data đó lên cho manager ở trên xử lý. -> Data ở manager thì
nó sẽ gần với UI hơn, hay nói cách khác, nó là Data của UI. 

Mọi công việc liên quan đến update hay get data thì phải thông qua usecase!

Một usecase có thể sử dụng: 5 cái repo chỉ để thực hiện một usecase get Conver
thôi chẳng hạn!

Use case có thể coi là nơi collect các data từ Repo, để tạo thành
data mà phía bên trên cần!