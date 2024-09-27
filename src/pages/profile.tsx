import "../../public/css/main.css";
import {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";

type User = {
    id: number;
    name: string;
    email: string;
    phone: string;
};

function Profile() {
    const param = useParams<{ id: string }>();
    // 用户信息
    const navigate = useNavigate();
    if (!param?.id) {
        navigate('/404');
    }
    const [user, setUser] = useState<User | null>(null);
    // 编辑状态
    const [isEditing, setIsEditing] = useState(false);

    const fetchUser = async (userId: string) => {
        const user = await fetch('/api/user/' + userId, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        }).then((res) => {
            if (!res.ok) {
                throw new Error('Error fetching user');
            }
            return res.json();
        }).then(data => {
            setUser(data);
        }).catch(error => {
            console.log(error);
        });
    };

    // 取单个用户信息
    useEffect(() => {
        fetchUser(param?.id);
    }, []);

    // 切换编辑模式
    const toggleEditing = () => {
        setIsEditing(!isEditing);
    };

    const handleChange = (e) => {
        const {name, value} = e.target;
        // 发送请求到后台
        setUser({...user, [name]: value});
    };

    const handlerSubmit = (e) => {
        e.preventDefault();
        setIsEditing(false);
        // 更新后台的数据
        fetch('/api/user/edit', {
            method: 'POST',
            body: JSON.stringify(user),
            headers: {
                'Content-Type': 'application/json',
            },
        }).then(response => {
            if (response.ok) {
                console.log('修改成功');
            }
        }).catch(err => {
            console.log(err);
        });
    };

    return (
        <div className="max-w-md mx-auto mt-10 mb-4 bg-white shadow-lg rounded-lg overflow-hidden">
            <h2 className="text-2xl py-4 px-6 bg-gray-900 text-white text-center font-bold uppercase">Profile</h2>

            <div className="py-4 px-6">
                <div className="flex flex-col md:flex-row md:text-left items-center space-y-4 md:space-y-0 md:space-x-4 mb-4">
                    <label className="block text-gray-700 font-bold mr-2">Name</label>
                    {isEditing ? (
                        <input
                            type="text"
                            name="name"
                            value={user?.name}
                            onChange={handleChange}
                            className="bg-white shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                    ) : (
                        <p className="mt-1 text-gray-600">{user?.name}</p>
                    )}
                </div>
            </div>

            <div className="py-4 px-6">
                <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-4 mb-4">
                    <label className="block text-gray-700 font-bold mr-2">Phone</label>
                    {isEditing ? (
                        <input
                            type="text"
                            name="phone"
                            value={user?.phone}
                            onChange={handleChange}
                            className="bg-white shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                    ) : (
                        <p className="mt-1 text-gray-600">{user?.phone}</p>
                    )}
                </div>
            </div>

            <div className="py-4 px-6">
                <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-4 mb-4">
                    <label className="block text-gray-700 font-bold mr-2">Email</label>
                    {isEditing ? (
                        <input
                            type="email"
                            name="email"
                            value={user?.email}
                            onChange={handleChange}
                            className="bg-white shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                    ) : (
                        <p className="mt-1 text-gray-600">{user?.email}</p>
                    )}
                </div>
            </div>

            <div className="flex justify-between">
                {isEditing ? (
                    <>
                        <button
                            onClick={handlerSubmit}
                            className="px-4 py-2 mb-4 ml-2 bg-green-500 text-white rounded hover:bg-green-600"
                        >
                            Save
                        </button>
                        <button onClick={toggleEditing}
                                className="px-4 py-2 mb-4 mr-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
                        >
                            Cancel
                        </button>
                    </>
                ) : (
                    <button
                        onClick={toggleEditing}
                        className="px-4 py-2 mb-4 ml-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                    >
                        Edit
                    </button>

                )}
            </div>
        </div>
    );
}

export default Profile;
