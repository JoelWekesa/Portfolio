import React, { Component } from "react";
import axios from "axios";
import { Modal, Button } from "antd";
import { HashLink } from "react-router-hash-link";
import LinearProgress from "@material-ui/core/LinearProgress";

export class Home extends Component {
	state = {
		images: [],
		Joel: "",
		show: false,
		error: null,
		name: "",
		email: "",
		subject: "",
		message: "",
		loading: false,
		missing: false,
		siteLoading: true,
	};
	componentDidMount = () => {
		setTimeout(() => {
			this.setState({
				...this.state,
				siteLoading: false,
			});
		}, 2000);

		const url = "https://joelwekesa.herokuapp.com/api/images/";
		axios
			.get(url)
			.then((res) => {
				console.log(res.data);
				this.setState({
					...this.state,
					images: res.data,
				});
			})
			.catch((err) => {
				console.log(err.message);
			});
	};

	handleChange = (e) => {
		const { name, value } = e.target;
		this.setState({
			...this.state,
			[name]: value,
		});
	};

	handleSubmit = (e) => {
		e.preventDefault();
		this.setState({
			...this.state,
			loading: true,
		});
		const { name, email, subject, message } = this.state;
		const body = { name, email, subject, message };
		const url = "https://joelwekesa.herokuapp.com/api/messages/";
		axios
			.post(url, body)
			.then(() => {
				this.setState({
					...this.state,
					loading: false,
					show: true,
					name: "",
					email: "",
					subject: "",
					message: "",
				});
				setTimeout(() => {
					this.setState({
						...this.state,
						show: false,
					});
				}, 15000);
			})
			.catch((err) => {
				const { message } = err;
				this.setState({
					...this.state,
					show: true,
					loading: false,
					error: message,
				});
				setTimeout(() => {
					this.setState({
						...this.state,
						show: false,
					});
				}, 15000);
			});
	};

	handleClose = () => {
		this.setState({
			...this.state,
			show: false,
			missing: false,
		});
	};

	handleMissing = () => {
		this.setState({
			...this.state,
			missing: true,
		});
	};

	doc = new jsPDF();

	saveDiv = (divId, title) => {
		doc.fromHTML(
			`<html><head><title>${title}</title></head><body>` +
				document.getElementById(divId).innerHTML +
				`</body></html>`
		);
		doc.save("div.pdf");
	};

	printDiv = (divId, title) => {
		let mywindow = window.open(
			"",
			"PRINT",
			"height=650,width=900,top=100,left=150"
		);

		mywindow.document.write(`<html><head><title>${title}</title>`);
		mywindow.document.write("</head><body >");
		mywindow.document.write(document.getElementById(divId).innerHTML);
		mywindow.document.write("</body></html>");

		mywindow.document.close(); // necessary for IE >= 10
		mywindow.focus(); // necessary for IE >= 10*/

		mywindow.print();
		mywindow.close();

		return true;
	};

	handleDownload = () => {
		this.printDiv("download", "Joel's Resume");
	};

	render() {
		const {
			images,
			Joel,
			show,
			error,
			name,
			email,
			subject,
			message,
			loading,
			missing,
			siteLoading,
		} = this.state;

		return (
			<>
				{show && error && !loading ? (
					<Modal
						animation={false}
						visible={show}
						title="Oops"
						onOk={this.handleOk}
						onCancel={this.handleCancel}
						footer={[
							<Button key="back" onClick={this.handleClose}>
								Try again
							</Button>,
						]}
						style={{ color: "red" }}>
						<p className="lead">
							{" "}
							There was an error in sending your message.
							<br />
							Please check your internet connection and try again.
						</p>
					</Modal>
				) : show && !error && !loading ? (
					<Modal
						animation={false}
						visible={show}
						title="Received"
						onOk={this.handleOk}
						onCancel={this.handleCancel}
						footer={[
							<Button key="back" onClick={this.handleClose}>
								Close
							</Button>,
						]}
						style={{ color: "green" }}>
						<p className="lead">
							{" "}
							Thank you for reaching out.
							<br />I have received your message and will get back to you soon.
						</p>
					</Modal>
				) : missing ? (
					<Modal
						animation={false}
						visible={show}
						title="Missing Fields"
						footer={[
							<Button key="back" onClick={this.handleClose}>
								Close
							</Button>,
						]}>
						<p className="lead">
							{" "}
							You did not fill some fields.
							<br />
							Please ensure you provide your name and message in the contact
							form.
						</p>
					</Modal>
				) : null}
				<i className="bi bi-list mobile-nav-toggle d-xl-none"></i>

				<header id="header">
					<div className="d-flex flex-column">
						<div className="profile">
							{images.length > 0 ? (
								<img
									src={images[0].image}
									alt=""
									className="img-fluid rounded-circle"
									style={{ width: "120px", height: "120px" }}
								/>
							) : null}

							<h1 className="text-light">
								<a href="index.html">Joel Wekesa</a>
							</h1>
							<div className="social-links mt-3 text-center">
								<a href="tel:+254742649976" className="linkedin">
									<i className="bi bi-phone"></i>
								</a>
								<a href="https://twitter.com/its_joel1" className="twitter">
									<i className="bx bxl-twitter"></i>
								</a>
								<a
									href="https://mobile.facebook.com/joel.wekesa.73"
									className="facebook">
									<i className="bx bxl-facebook"></i>
								</a>
								<a
									href="https://www.instagram.com/joelmunialo/"
									className="instagram">
									<i className="bx bxl-instagram"></i>
								</a>
								<a href="https://github.com/JoelWekesa" className="google-plus">
									<i className="bx bxl-github"></i>
								</a>
							</div>
						</div>

						<nav id="navbar" className="nav-menu navbar">
							<ul>
								<li>
									<HashLink to="/#hero" className="nav-link scrollto active">
										<i className="bx bx-home"></i> <span>Home</span>
									</HashLink>
								</li>
								<li>
									<HashLink to="/#about" className="nav-link scrollto">
										<i className="bx bx-user"></i> <span>About</span>
									</HashLink>
								</li>
								<li>
									<HashLink to="/#skills" className="nav-link scrollto">
										<i className="bx bxl-python"></i>
										<span>Skills</span>
									</HashLink>
								</li>
								<li>
									<HashLink to="/#resume" className="nav-link scrollto">
										<i className="bx bx-file-blank"></i> <span>Resume</span>
									</HashLink>
								</li>
								<li>
									<HashLink to="/#portfolio" className="nav-link scrollto">
										<i className="bx bx-book-content"></i>{" "}
										<span>Portfolio</span>
									</HashLink>
								</li>
								<li>
									<HashLink to="/#services" className="nav-link scrollto">
										<i className="bx bx-question-mark"></i>{" "}
										<span>Why Choose Me?</span>
									</HashLink>
								</li>
								<li>
									<HashLink to="/#contact" className="nav-link scrollto">
										<i className="bx bx-envelope"></i> <span>Contact</span>
									</HashLink>
								</li>
							</ul>
						</nav>
					</div>
				</header>

				<section
					id="hero"
					className="d-flex flex-column justify-content-center align-items-center">
					<div className="hero-container" data-aos="fade-in">
						<h1> Hi, I'm Joel Wekesa. </h1>
						<p className="lead">
							I'm a{" "}
							<span
								className="typed"
								data-typed-items="seasoned software developer, telecommunications engineer, training data scientist, photographer"></span>
						</p>
					</div>
				</section>

				<main id="main">
					<section id="about" className="about">
						<div className="container">
							<div className="section-title">
								<h2>About</h2>
								<p className="lead">
									I'm an ambitious and results oriented software developer,
									fueled by the desire to create simple solutions to everyday
									complex problems.
								</p>
							</div>

							<div className="row">
								<div className="col-lg-4" data-aos="fade-right">
									{images.length > 0 ? (
										<img
											src={images[0].image}
											alt=""
											className="img-fluid rounded-circle"
											style={{ width: "300px", height: "300px" }}
										/>
									) : null}
								</div>
								<div
									className="col-lg-8 pt-4 pt-lg-0 content"
									data-aos="fade-left">
									<h3>UI/UX Designer &amp; Web Developer.</h3>
									<p className="fst-italic">
										I love what I do, and that makes every work day a vacation.{" "}
									</p>
									<div className="row">
										<div className="col-lg-6">
											<ul>
												<li>
													<i className="bi bi-chevron-right"></i>{" "}
													<strong>Phone:</strong>{" "}
													<span>
														<a href="tel:+254742649976"> +254 742 649976</a>
													</span>
												</li>
												<li>
													<i className="bi bi-chevron-right"></i>{" "}
													<strong>Email:</strong>{" "}
													<a href="mailto:joelwekesa.jw@gmail.com">
														joelwekesa.jw@gmail.com
													</a>
												</li>
												<li>
													<i className="bi bi-chevron-right"></i>{" "}
													<strong>City:</strong> <span>Nairobi, Kenya</span>
												</li>
											</ul>
										</div>
										<div className="col-lg-6">
											<ul>
												<li>
													<i className="bi bi-chevron-right"></i>{" "}
													<strong>Degree:</strong>{" "}
													<span>Telecommunications and IT</span>
												</li>
												<li>
													<i className="bi bi-chevron-right"></i>{" "}
													<strong>Freelance:</strong> <span>Available</span>
												</li>
											</ul>
										</div>
									</div>
									<p className="lead">
										I'm focused on consistency, professionalism, and timely
										delivery. This focus allows me to create masterpieces out of
										every project I undertake.
									</p>
								</div>
							</div>
						</div>
					</section>

					<section id="facts" className="facts">
						<div className="container">
							<div className="section-title">
								<h2>Facts</h2>
								<p className="lead">
									Here is a statistical lowdown of the clients I've worked with,
									the projects I've completed, hours of support on completed
									projects, and professionals I work with to ensure your
									projects are delivered beyond your expectations.
								</p>
							</div>

							<div className="row no-gutters">
								<div
									className="col-lg-3 col-md-6 d-md-flex align-items-md-stretch"
									data-aos="fade-up">
									<div className="count-box">
										<i className="bi bi-emoji-smile"></i>
										<span
											data-purecounter-start="0"
											data-purecounter-end="96"
											data-purecounter-duration="1"
											className="purecounter"></span>
										<p className="lead">
											<strong>Happy Clients</strong>
										</p>
									</div>
								</div>

								<div
									className="col-lg-3 col-md-6 d-md-flex align-items-md-stretch"
									data-aos="fade-up"
									data-aos-delay="100">
									<div className="count-box">
										<i className="bi bi-journal-richtext"></i>
										<span
											data-purecounter-start="0"
											data-purecounter-end="218"
											data-purecounter-duration="1"
											className="purecounter"></span>
										<p className="lead">
											<strong>Completed Projects</strong>
										</p>
									</div>
								</div>

								<div
									className="col-lg-3 col-md-6 d-md-flex align-items-md-stretch"
									data-aos="fade-up"
									data-aos-delay="200">
									<div className="count-box">
										<i className="bi bi-headset"></i>
										<span
											data-purecounter-start="0"
											data-purecounter-end="1800"
											data-purecounter-duration="1"
											className="purecounter"></span>
										<p className="lead">
											<strong>Hours Of Support</strong>
										</p>
									</div>
								</div>

								<div
									className="col-lg-3 col-md-6 d-md-flex align-items-md-stretch"
									data-aos="fade-up"
									data-aos-delay="300">
									<div className="count-box">
										<i className="bi bi-people"></i>
										<span
											data-purecounter-start="0"
											data-purecounter-end="32"
											data-purecounter-duration="1"
											className="purecounter"></span>
										<p className="lead">
											<strong>Collaborating Professionals</strong>
										</p>
									</div>
								</div>
							</div>
						</div>
					</section>

					<section id="skills" className="skills section-bg">
						<div className="container">
							<div className="section-title">
								<h2>Skills</h2>
								<p className="lead">
									I am a fullstack web developer with a bias in Django and React
									frameworks. I continue to learn other technologies to ensure
									quality and timely delivery.
								</p>
								<br />
							</div>

							<div className="row skills-content">
								<div className="col-lg-6" data-aos="fade-up">
									<div className="progress">
										<span className="skill">
											Django <i className="val">100%</i>
										</span>
										<div className="progress-bar-wrap">
											<div
												className="progress-bar"
												role="progressbar"
												aria-describedby="Django"
												aria-label="Django"
												aria-valuenow="100"
												aria-valuemin="0"
												aria-valuemax="100"></div>
										</div>
									</div>

									<div className="progress">
										<span className="skill">
											React <i className="val">98%</i>
										</span>
										<div className="progress-bar-wrap">
											<div
												className="progress-bar"
												role="progressbar"
												aria-describedby="React"
												aria-label="React"
												aria-valuenow="98"
												aria-valuemin="0"
												aria-valuemax="100"></div>
										</div>
									</div>

									<div className="progress">
										<span className="skill">
											Relational Databases <i className="val">95%</i>
										</span>
										<div className="progress-bar-wrap">
											<div
												className="progress-bar"
												role="progressbar"
												aria-describedby="Databases"
												aria-label="Databases"
												aria-valuenow="95"
												aria-valuemin="0"
												aria-valuemax="100"></div>
										</div>
									</div>
								</div>

								<div
									className="col-lg-6"
									data-aos="fade-up"
									data-aos-delay="100">
									<div className="progress">
										<span className="skill">
											Python <i className="val">98%</i>
										</span>
										<div className="progress-bar-wrap">
											<div
												className="progress-bar"
												role="progressbar"
												aria-describedby="Python"
												aria-label="Python"
												aria-valuenow="98"
												aria-valuemin="0"
												aria-valuemax="100"></div>
										</div>
									</div>

									<div className="progress">
										<span className="skill">
											Cryptography and encryption <i className="val">75%</i>
										</span>
										<div className="progress-bar-wrap">
											<div
												className="progress-bar"
												role="progressbar"
												aria-describedby="Cryptography"
												aria-label="Cryptography"
												aria-valuenow="75"
												aria-valuemin="0"
												aria-valuemax="100"></div>
										</div>
									</div>

									<div className="progress">
										<span className="skill">
											WordPress/CMS <i className="val">90%</i>
										</span>
										<div className="progress-bar-wrap">
											<div
												id="WordPress"
												className="progress-bar"
												role="progressbar"
												aria-labelledby="WordPress"
												aria-label="WordPress"
												aria-describedby="Wordpress"
												aria-valuenow="90"
												aria-valuemin="0"
												aria-valuemax="100"></div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</section>

					<section id="resume" className="resume">
						<div className="container">
							<div id="download">
								<div className="section-title">
									<h2>Resume</h2>
									<p>
										Here's a summary of my educational background and budding
										career.
									</p>
								</div>

								<div className="row">
									<div className="col-lg-6" data-aos="fade-up">
										<h3 className="resume-title">Summary</h3>
										<div className="resume-item pb-0">
											<h4>Joel Wekesa</h4>
											<p>
												<em>
													Dedicated, diligent, and efficient software developer
													with 2+ years experience in UI/UX, API's and
													databases. Seeking to further improve full stack
													skills as your preferred developer.
												</em>
											</p>
											<ul>
												<li>+254 742 649976</li>
												<li>joelwekesa.jw@gmail.com</li>
											</ul>
										</div>

										<h3 className="resume-title">Education</h3>
										<div className="resume-item">
											<h4>
												BSc Telecommunications &amp; Information Technology
											</h4>
											<h5>2013 - 2017</h5>
											<p>
												<em>Kenyatta University, Nairobi, Kenya</em>
											</p>
											<p>
												<b>Relevant Coursework: </b>Operating Systems
												Architecture, Usability in Website and Software Design,
												C++ Programming, Relational Database Design & SQL, Data
												Engineering.
											</p>
										</div>
										<h3 className="resume-title">Technical Expertise</h3>
										<div className="resume-item">
											<h4>Databases</h4>
											<p> MySQL | PostgreSQL</p>
										</div>
										<div className="resume-item">
											<h4>Programming</h4>
											<p>
												{" "}
												HTML5 | CSS3/SASS | JavaScript | ReactJS | Django |
												Python | Bash/Shell | REST APIs
											</p>
										</div>
									</div>
									<div
										className="col-lg-6"
										data-aos="fade-up"
										data-aos-delay="100">
										<h3 className="resume-title">Professional Experience</h3>
										<div className="resume-item">
											<h4>Software Developer</h4>
											<h5>2021 - Present</h5>
											<p>
												<em>mHealth Kenya, Nairobi, Kenya </em>
											</p>
											<ul>
												<li>Design and implement new software solutions.</li>
												<li>
													Design and implement improvements to existing software
													products.
												</li>
												<li>
													Research technical issues and generate
													creative/innovative solutions.
												</li>
											</ul>
										</div>
										<div className="resume-item">
											<h4>Freelance Software Developer</h4>
											<h5>2017 - Present</h5>
											<ul>
												<li>
													Research, identification, and documentation of
													clients' technical requirements.
												</li>
												<li>
													Development and documentation of system architectures.
												</li>
												<li>Creation of data flows and database schemas.</li>
												<li>
													Implementation of project design, standards and
													processes.
												</li>
												<li>
													Continuous system support and training services.
												</li>
											</ul>
										</div>
									</div>
								</div>
							</div>
							<div id="editor"></div>
							<div>
								<button className="btn btn-info" onClick={this.handleDownload}>
									Download Resume
								</button>
							</div>
						</div>
					</section>

					<section id="portfolio" className="portfolio">
						<div className="container">
							<div className="section-title">
								<h2>Portfolio</h2>
								<p className="lead">
									I am the founder and creator of{" "}
									<a href="https://www.cladi.shop/">cladi.shop</a> cladi.shop is
									an online shopping platform that seeks to avail quality
									fashion at affordable prices. You can click on{" "}
									<a href="https://www.cladi.shop/">Cladi.shop</a> to go to the
									website or watch the video bellow that demonstrates shopping
									on the website.
								</p>
							</div>

							<div
								className="container-iframe"
								data-aos="fade-up"
								data-aos-delay="100">
								<iframe
									className="responsive-iframe"
									title="YouTube link to Cladi"
									loading="lazy"
									src="https://www.youtube.com/embed/RYbvg4fGSEo"></iframe>
							</div>
						</div>
					</section>

					<section id="services" className="services section-bg">
						<div className="container">
							<div className="section-title">
								<h2>Why choose me?</h2>
								<p className="lead">
									I pride myself in using comprehensive road maps to create
									modern, reliable, and scalable software products that meet
									your requirements and expectations. Here's a list of the
									services I offer.
								</p>
							</div>

							<div className="row">
								<div
									className="col-lg-4 col-md-6 icon-box"
									data-aos="fade-up"
									data-aos-delay="100">
									<div className="icon">
										<i className="bi bi-bar-chart-steps"></i>
									</div>
									<h3 className="title">
										<a href="/">Database Design and Implementation</a>
									</h3>
									<p className="description">
										I use best database design practices and principles to
										ensure information consistency, efficiently executing
										queries, zero data redundancy, and enhanced database
										performance.
									</p>
								</div>

								<div className="col-lg-4 col-md-6 icon-box" data-aos="fade-up">
									<div className="icon">
										<i className="bi bi-code-slash"></i>
									</div>
									<h3 className="title">
										<a href="/">Application Programming Interfaces (APIs)</a>
									</h3>
									<p className="description">
										Modern software systems are composed of many servers,
										services, and other components that communicate through
										APIs. I create stable, reliable, and easy to use APIs that
										guarantee scalability of your software systems.
									</p>
								</div>

								<div
									className="col-lg-4 col-md-6 icon-box"
									data-aos="fade-up"
									data-aos-delay="200">
									<div className="icon">
										<i className="bi bi-laptop"></i>
									</div>
									<h3 className="title">
										<a href="/">UI/UX design</a>
									</h3>
									<p className="description">
										I create interactive, immersive, and easy to use UI/UX
										designs that attract prospective and existing clients to
										your website.
									</p>
								</div>
								<div
									className="col-lg-4 col-md-6 icon-box"
									data-aos="fade-up"
									data-aos-delay="300">
									<div className="icon">
										<i className="bi bi-binoculars"></i>
									</div>
									<h3 className="title">
										<a href="/">Search Engine Optimization (SEO)</a>
									</h3>
									<p className="description">
										SEO is rapidly becoming an indispensable part of digital
										marketing. This realization motivates me to create websites
										that leverage on SEO to enhance web traffic, visibility and
										rankings, user experience, and general growth of my clients'
										businesses.
									</p>
								</div>
								<div
									className="col-lg-4 col-md-6 icon-box"
									data-aos="fade-up"
									data-aos-delay="400">
									<div className="icon">
										<i className="bi bi-gear-wide-connected"></i>
									</div>
									<h3 className="title">
										<a href="/">Technical Support</a>
									</h3>
									<p className="description">
										With most of the systems I create being reliable and easy to
										use, technical support is essentially for client training
										and explanation of tech jargon. I offer tech support on
										demand, which is seldom.
									</p>
								</div>
								<div
									className="col-lg-4 col-md-6 icon-box"
									data-aos="fade-up"
									data-aos-delay="500">
									<div className="icon">
										<i className="bi bi-cash"></i>
									</div>
									<h3 className="title">
										<a href="/">Cost Efficiency</a>
									</h3>
									<p className="description">
										Clients are the backbone of my freelance business. I
										understand that different clients have different
										requirements and financial abilities. For this reason, I use
										client-friendly pricing models that save on cost and favor a
										positive return on investment.
									</p>
								</div>
							</div>
						</div>
					</section>

					{/* <section id="testimonials" className="testimonials section-bg">
						<div className="container">
							<div className="section-title">
								<h2>Testimonials</h2>
								<p>
									Magnam dolores commodi suscipit. Necessitatibus eius
									consequatur ex aliquid fuga eum quidem. Sit sint consectetur
									velit. Quisquam quos quisquam cupiditate. Et nemo qui impedit
									suscipit alias ea. Quia fugiat sit in iste officiis commodi
									quidem hic quas.
								</p>
							</div>

							<div
								className="testimonials-slider swiper-container"
								data-aos="fade-up"
								data-aos-delay="100">
								<div className="swiper-wrapper">
									<div className="swiper-slide">
										<div className="testimonial-item" data-aos="fade-up">
											<p>
												<i className="bx bxs-quote-alt-left quote-icon-left"></i>
												Proin iaculis purus consequat sem cure digni ssim donec
												porttitora entum suscipit rhoncus. Accusantium quam,
												ultricies eget id, aliquam eget nibh et. Maecen aliquam,
												risus at semper.
												<i className="bx bxs-quote-alt-right quote-icon-right"></i>
											</p>
											<img
												src="assets/img/testimonials/testimonials-1.jpg"
												className="testimonial-img"
												alt=""
											/>
											<h3>Saul Goodman</h3>
											<h4>Ceo &amp; Founder</h4>
										</div>
									</div>

									<div className="swiper-slide">
										<div
											className="testimonial-item"
											data-aos="fade-up"
											data-aos-delay="100">
											<p>
												<i className="bx bxs-quote-alt-left quote-icon-left"></i>
												Export tempor illum tamen malis malis eram quae irure
												esse labore quem cillum quid cillum eram malis quorum
												velit fore eram velit sunt aliqua noster fugiat irure
												amet legam anim culpa.
												<i className="bx bxs-quote-alt-right quote-icon-right"></i>
											</p>
											<img
												src="assets/img/testimonials/testimonials-2.jpg"
												className="testimonial-img"
												alt=""
											/>
											<h3>Sara Wilsson</h3>
											<h4>Designer</h4>
										</div>
									</div>

									<div className="swiper-slide">
										<div
											className="testimonial-item"
											data-aos="fade-up"
											data-aos-delay="200">
											<p>
												<i className="bx bxs-quote-alt-left quote-icon-left"></i>
												Enim nisi quem export duis labore cillum quae magna enim
												sint quorum nulla quem veniam duis minim tempor labore
												quem eram duis noster aute amet eram fore quis sint
												minim.
												<i className="bx bxs-quote-alt-right quote-icon-right"></i>
											</p>
											<img
												src="assets/img/testimonials/testimonials-3.jpg"
												className="testimonial-img"
												alt=""
											/>
											<h3>Jena Karlis</h3>
											<h4>Store Owner</h4>
										</div>
									</div>
									<div className="swiper-slide">
										<div
											className="testimonial-item"
											data-aos="fade-up"
											data-aos-delay="300">
											<p>
												<i className="bx bxs-quote-alt-left quote-icon-left"></i>
												Fugiat enim eram quae cillum dolore dolor amet nulla
												culpa multos export minim fugiat minim velit minim dolor
												enim duis veniam ipsum anim magna sunt elit fore quem
												dolore labore illum veniam.
												<i className="bx bxs-quote-alt-right quote-icon-right"></i>
											</p>
											<img
												src="assets/img/testimonials/testimonials-4.jpg"
												className="testimonial-img"
												alt=""
											/>
											<h3>Matt Brandon</h3>
											<h4>Freelancer</h4>
										</div>
									</div>
									<div className="swiper-slide">
										<div
											className="testimonial-item"
											data-aos="fade-up"
											data-aos-delay="400">
											<p>
												<i className="bx bxs-quote-alt-left quote-icon-left"></i>
												Quis quorum aliqua sint quem legam fore sunt eram irure
												aliqua veniam tempor noster veniam enim culpa labore
												duis sunt culpa nulla illum cillum fugiat legam esse
												veniam culpa fore nisi cillum quid.
												<i className="bx bxs-quote-alt-right quote-icon-right"></i>
											</p>
											<img
												src="assets/img/testimonials/testimonials-5.jpg"
												className="testimonial-img"
												alt=""
											/>
											<h3>John Larson</h3>
											<h4>Entrepreneur</h4>
										</div>
									</div>
								</div>
								<div className="swiper-pagination"></div>
							</div>
						</div>
					</section> */}

					<section id="contact" className="contact">
						<div className="container">
							<div className="section-title">
								<h2>Contact</h2>
								<p className="lead">
									I am reachable 24/7 through the contacts listed below. I
									always look forward to hearing from you.
								</p>
							</div>

							<div className="row" data-aos="fade-in">
								<div className="col-lg-5 d-flex align-items-stretch">
									<div className="info">
										<div className="address">
											<i className="bi bi-geo-alt"></i>
											<h3> Location:</h3>
											<p className="lead">Nairobi, Kenya</p>
										</div>

										<div className="email">
											<i className="bi bi-envelope"></i>
											<h3> Email:</h3>
											<p className="lead">
												<a href="mailto:joelwekesa.jw@gmail.com">
													joelwekesa.jw@gmail.com
												</a>
											</p>
										</div>

										<div className="phone">
											<i className="bi bi-phone"></i>
											<h3> Call:</h3>
											<p className="lead">
												<a href="tel:+254742649976"> +254 742 649976</a>
											</p>
										</div>

										<iframe
											src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d15956.021117798682!2d36.91468875!3d-1.1567103999999997!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2ske!4v1618942156298!5m2!1sen!2ske"
											loading="lazy"
											title="This is my office location"
											frameBorder="0"
											style={{ border: 0, width: "100%", height: "290px" }}
											allowFullScreen></iframe>
									</div>
								</div>

								<div className="col-lg-7 mt-5 mt-lg-0 d-flex align-items-stretch">
									<form
										action="forms/contact.php"
										// method='post'
										role="form"
										className="php-email-form">
										<div className="row">
											<div className="form-group col-md-6">
												<label htmlFor="name">Your Name</label>
												<input
													type="text"
													name="name"
													value={name}
													className="form-control"
													id="name"
													onChange={this.handleChange}
													required
												/>
											</div>
											<div className="form-group col-md-6">
												<label htmlFor="email">Your Email</label>
												<input
													type="email"
													className="form-control"
													name="email"
													value={email}
													id="email"
													onChange={this.handleChange}
													required
												/>
											</div>
										</div>
										<div className="form-group">
											<label htmlFor="subject">Subject</label>
											<input
												type="text"
												className="form-control"
												name="subject"
												value={subject}
												id="subject"
												onChange={this.handleChange}
												required
											/>
										</div>
										<div className="form-group">
											<label htmlFor="message">
												Message
												<textarea
													className="form-control"
													name="message"
													value={message}
													rows="10"
													cols="100"
													onChange={this.handleChange}
													required></textarea>
											</label>
										</div>
										<div className="my-3">
											<div className="loading">Loading</div>
											<div className="error-message"></div>
											<div className="sent-message">
												Your message has been sent. Thank you!
											</div>
										</div>
										<div className="text-center">
											{name && message ? (
												<button type="submit" onClick={this.handleSubmit}>
													Send Message
												</button>
											) : loading ? (
												<LinearProgress />
											) : (
												<div className="disabled">
													<button
														type="submit"
														onClick={this.handleMissing}
														className="disabled">
														Send Message
													</button>
												</div>
											)}
										</div>
									</form>
								</div>
							</div>
						</div>
					</section>
				</main>

				<footer id="footer">
					<div className="container">
						<div className="copyright">
							&copy; Copyright{" "}
							<strong>
								<span>iPortfolio</span>
							</strong>
						</div>
						<div className="credits">
							Designed by <a href="https://bootstrapmade.com/">BootstrapMade</a>
						</div>
					</div>
				</footer>
				<a
					href="#"
					className="back-to-top d-flex align-items-center justify-content-center">
					<i className="bi bi-arrow-up-short"></i>
				</a>
			</>
		);
	}
}

export default Home;
