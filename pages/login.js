import { useState } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import styles from '../styles/Home.module.css';

const commonData = require('../data/common.json');

export default function Login() {
	const [password, setPassword] = useState('');
	const [showPassword, setShowPassword] = useState(false);
	const [pwdBtnClass, setPwdBtnClass] = useState('btn-show-button');

	const handleLogin = (e) => {
		console.log('Login');
	};

	const handlePasswordChange = (event) => {
		setPassword(event.target.value);
	};

	const toggleShowPassword = () => {
		setPwdBtnClass((prevState) => {
			if (prevState === 'btn-show-button') {
				setPwdBtnClass('btn-hide-button');
			} else {
				setPwdBtnClass('btn-show-button');
			}
		});
		setShowPassword((prevState) => !prevState);
	};

	return (
		<div>
			<Head>
				<title>
					Login | {commonData.SiteName} | Statistiche per il Fantacalcio
				</title>
				<meta
					name="description"
					content="Analizza le statitstiche per migliorare il tuo Fantacalcio"
				/>
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<main className="pt-16 flex items-center justify-center h-screen">
				<div className="border p-8 rounded-lg w-full max-w-lg shadow-xl">
					<h3 className="text-3xl font-bold">Login</h3>
					<input
						type="text"
						name="email"
						className="input input-bordered w-full mt-2"
						placeholder="latua@email.com"
					/>
					<div className="relative">
						<input
							name="password"
							className="input input-bordered w-full mt-2"
							placeholder="La tua password"
							type={showPassword ? 'text' : 'password'}
							value={password}
							onChange={handlePasswordChange}
						/>
						<span
							className={pwdBtnClass}
							onClick={toggleShowPassword}
						></span>
					</div>
					<div className="flex justify-between items-center">
						<ul className="text-sm flex gap-4">
							<li>
								<Link href="/register">Registrati</Link>
							</li>
							<li> / </li>
							<li>
								<Link href="/register">Recupera password</Link>
							</li>
						</ul>
						<input
							type="submit"
							className="btn btn-primary mt-2"
							value="Login"
							onClick={handleLogin()}
						/>
					</div>
				</div>
			</main>
			<style jsx>{`
				.btn-show-button {
					display: inline-block;
					width: 24px;
					height: 24px;
					position: absolute;
					top: 60%;
					right: 20px;
					transform: translateY(-50%);
					opacity: 0.5;
					background: url('https://api.iconify.design/fluent/eye-16-filled.svg')
						no-repeat center center / contain;
				}
				.btn-hide-button {
					display: inline-block;
					width: 24px;
					height: 24px;
					position: absolute;
					top: 60%;
					right: 20px;
					transform: translateY(-50%);
					opacity: 0.5;
					background: url('https://api.iconify.design/fluent/eye-hide-24-filled.svg')
						no-repeat center center / contain;
				}
			`}</style>
		</div>
	);
}
