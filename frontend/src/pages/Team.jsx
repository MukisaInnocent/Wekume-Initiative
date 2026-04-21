import { useEffect, useState } from 'react';
import { Mail, Phone, Users, Briefcase, Instagram, Twitter, Linkedin, ArrowUpRight, X, ChevronRight } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { contentAPI } from '../services/api';
import { useRegion } from '../context/RegionContext';

function calculateAge(dob) {
    if (!dob) return null;
    const birth = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
        age -= 1;
    }
    return age;
}

/* ─── Animated Counter Hook ─── */
function useCountUp(target, duration = 1500) {
    const [count, setCount] = useState(0);
    useEffect(() => {
        if (target <= 0) return;
        let start = 0;
        const step = Math.ceil(target / (duration / 16));
        const timer = setInterval(() => {
            start += step;
            if (start >= target) {
                setCount(target);
                clearInterval(timer);
            } else {
                setCount(start);
            }
        }, 16);
        return () => clearInterval(timer);
    }, [target, duration]);
    return count;
}

function Team() {
    const { region } = useRegion();
    const [teamMembers, setTeamMembers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedDepartment, setSelectedDepartment] = useState('All');
    const [selectedMember, setSelectedMember] = useState(null);
    const [departments, setDepartments] = useState([]);

    useEffect(() => {
        const fetchMembers = async () => {
            try {
                const response = await contentAPI.getTeamMembers(region);
                const members = response.data.members || [];
                const enriched = members.map((member) => ({
                    ...member,
                    age: member.age ?? calculateAge(member.date_of_birth)
                }));
                setTeamMembers(enriched);

                const depts = ['All', ...new Set(enriched
                    .filter(m => m.department && m.is_active !== false)
                    .map(m => m.department)
                )].sort((a, b) => a === 'All' ? -1 : b === 'All' ? 1 : a.localeCompare(b));
                setDepartments(depts);
            } catch (error) {
                console.error('Failed to fetch team members:', error);
                setTeamMembers([]);
            } finally {
                setLoading(false);
            }
        };

        fetchMembers();
    }, [region]);

    const activeMembers = teamMembers.filter(m => m.is_active !== false);
    const filteredMembers = selectedDepartment === 'All'
        ? activeMembers
        : activeMembers.filter(m => m.department === selectedDepartment);

    const memberCount = useCountUp(activeMembers.length);
    const deptCount = useCountUp(departments.length > 1 ? departments.length - 1 : 0);

    // Prevent scrolling when modal is open
    useEffect(() => {
        if (selectedMember) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => { document.body.style.overflow = 'unset'; };
    }, [selectedMember]);

    return (
        <div className="bg-white dark:bg-[#010101] min-h-screen">
            <Navbar />

            {/* ─── Hero Section ─── */}
            <div className="relative pt-32 pb-24 lg:pt-40 lg:pb-32 overflow-hidden bg-gradient-to-br from-[#341525] via-[#1a0a12] to-[#010101]">
                {/* Ambient Orbs */}
                <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
                    <div className="absolute top-0 right-0 w-[700px] h-[700px] bg-[#9e00ff] rounded-full blur-[160px] opacity-20 translate-x-1/3 -translate-y-1/4"></div>
                    <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#ea638c] rounded-full blur-[140px] opacity-15 -translate-x-1/4 translate-y-1/3"></div>
                    <div className="absolute top-1/2 left-1/2 w-[400px] h-[400px] bg-[#f89d61] rounded-full blur-[120px] opacity-10 -translate-x-1/2 -translate-y-1/2"></div>
                </div>

                <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
                    <div className="inline-flex items-center gap-2 rounded-full bg-white/10 backdrop-blur-md border border-white/15 px-5 py-2.5 shadow-sm animate-fade-in-up">
                        <Users size={16} className="text-[#ea638c]" />
                        <span className="text-sm font-bold uppercase tracking-widest text-white/90">Our Brilliant Team</span>
                    </div>

                    <h1 className="text-5xl md:text-7xl font-black text-white tracking-tight animate-fade-in-up leading-[1.1]" style={{ animationDelay: '100ms' }}>
                        Meet the{' '}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ea638c] via-[#9e00ff] to-[#f89d61]">
                            Visionaries
                        </span>
                    </h1>

                    <p className="max-w-2xl mx-auto text-lg md:text-xl text-[#f7b2d0] animate-fade-in-up" style={{ animationDelay: '200ms' }}>
                        Exceptional talent united by purpose. Together, we are driving impact and shaping the future across regions.
                    </p>

                    {/* ─── Stats Counter Bar ─── */}
                    <div className="flex flex-wrap justify-center gap-6 md:gap-12 pt-8 animate-fade-in-up" style={{ animationDelay: '300ms' }}>
                        <div className="flex flex-col items-center">
                            <span className="text-4xl md:text-5xl font-black text-white tabular-nums">{memberCount}</span>
                            <span className="text-xs font-bold uppercase tracking-widest text-[#f7b2d0] mt-1">Members</span>
                        </div>
                        <div className="w-px h-16 bg-white/15 hidden md:block"></div>
                        <div className="flex flex-col items-center">
                            <span className="text-4xl md:text-5xl font-black text-white tabular-nums">{deptCount}</span>
                            <span className="text-xs font-bold uppercase tracking-widest text-[#f7b2d0] mt-1">Departments</span>
                        </div>
                        <div className="w-px h-16 bg-white/15 hidden md:block"></div>
                        <div className="flex flex-col items-center">
                            <span className="text-4xl md:text-5xl font-black text-white tabular-nums">2</span>
                            <span className="text-xs font-bold uppercase tracking-widest text-[#f7b2d0] mt-1">Regions</span>
                        </div>
                    </div>
                </div>
            </div>

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 -mt-12 relative z-20">
                {loading ? (
                    <div className="flex flex-col items-center justify-center p-20 space-y-4">
                        <div className="w-12 h-12 rounded-full border-4 border-[#f7b2d0] border-t-[#9e00ff] animate-spin"></div>
                        <p className="text-gray-900 dark:text-gray-100 font-semibold uppercase tracking-widest text-sm">Loading Members...</p>
                    </div>
                ) : (
                    <div className="space-y-10">
                        {/* ─── Glassmorphism Filter Bar ─── */}
                        <div className="sticky top-20 z-30 py-3">
                            <div className="flex items-center gap-2 overflow-x-auto no-scrollbar p-1.5 rounded-2xl bg-white/80 dark:bg-[#1a0a12]/80 backdrop-blur-xl border border-gray-200 dark:border-[#341525] shadow-lg mx-auto max-w-fit">
                                {departments.map((dept) => {
                                    const isSelected = selectedDepartment === dept;

                                    return (
                                        <button
                                            key={dept}
                                            onClick={() => setSelectedDepartment(dept)}
                                            className={`whitespace-nowrap px-5 py-2.5 rounded-xl text-sm font-bold tracking-wide transition-all duration-300 flex items-center gap-2
                                                ${isSelected
                                                    ? 'bg-gradient-to-r from-[#9e00ff] to-[#ea638c] text-white shadow-lg shadow-[#9e00ff]/20 scale-[1.02]'
                                                    : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-[#341525]/60 hover:text-gray-900 dark:hover:text-white'
                                                }`}
                                        >
                                            {dept}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>

                        {/* ─── Team Grid — Hover-to-Reveal Cards ─── */}
                        {filteredMembers.length > 0 ? (
                            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 items-start">
                                {filteredMembers.map((member, idx) => (
                                    <button
                                        key={member.id}
                                        onClick={() => setSelectedMember(member)}
                                        className="group relative flex flex-col text-left rounded-[1.75rem] overflow-hidden shadow-[0_4px_20px_rgb(0,0,0,0.06)] dark:shadow-none hover:shadow-[0_20px_50px_rgb(0,0,0,0.12)] dark:hover:shadow-[0_20px_50px_rgba(158,0,255,0.08)] transition-all duration-500 hover:-translate-y-2 animate-fade-in-up bg-white dark:bg-[#1a0a12] border border-gray-100 dark:border-[#341525]/80"
                                        style={{ animationDelay: `${(idx % 12) * 60}ms` }}
                                    >
                                        {/* Photo Container */}
                                        <div className="relative w-full aspect-[3/4] overflow-hidden bg-gradient-to-br from-[#f2f5d1] to-[#f7b2d0] dark:from-[#341525] dark:to-[#1a0a12]">
                                            {member.photo_url ? (
                                                <img
                                                    src={member.photo_url}
                                                    alt={member.name}
                                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                                />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center">
                                                    <span className="text-8xl font-black text-[#ea638c]/30 dark:text-[#9e00ff]/20 select-none">
                                                        {member.name.charAt(0)}
                                                    </span>
                                                </div>
                                            )}

                                            {/* Department Pill */}
                                            {member.department && (
                                                <div className="absolute top-4 left-4 inline-flex items-center gap-1.5 rounded-full bg-white/90 dark:bg-[#010101]/80 backdrop-blur-md px-3 py-1 shadow-sm">
                                                    <span className="w-1.5 h-1.5 rounded-full bg-[#9e00ff]"></span>
                                                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#341525] dark:text-[#f7b2d0]">
                                                        {member.department}
                                                    </span>
                                                </div>
                                            )}

                                            {/* Hover Overlay */}
                                            <div className="absolute inset-0 bg-gradient-to-t from-[#341525] via-[#341525]/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-6">
                                                {/* Social Links */}
                                                {member.social_links && Object.values(member.social_links).some(Boolean) && (
                                                    <div className="flex gap-2 mb-4 translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-100">
                                                        {member.social_links.linkedin && (
                                                            <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm text-white flex items-center justify-center hover:bg-white/30 transition-colors">
                                                                <Linkedin size={14} />
                                                            </div>
                                                        )}
                                                        {member.social_links.twitter && (
                                                            <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm text-white flex items-center justify-center hover:bg-white/30 transition-colors">
                                                                <Twitter size={14} />
                                                            </div>
                                                        )}
                                                        {member.social_links.instagram && (
                                                            <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm text-white flex items-center justify-center hover:bg-white/30 transition-colors">
                                                                <Instagram size={14} />
                                                            </div>
                                                        )}
                                                    </div>
                                                )}

                                                <div className="inline-flex items-center gap-2 text-[#f89d61] font-bold text-xs uppercase tracking-widest translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-150">
                                                    View Profile <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                                                </div>
                                            </div>
                                        </div>

                                        {/* Name & Role — Always visible */}
                                        <div className="px-5 py-4">
                                            <h3 className="text-base font-bold text-gray-900 dark:text-white leading-tight mb-0.5 group-hover:text-[#9e00ff] dark:group-hover:text-[#ea638c] transition-colors">
                                                {member.name}
                                            </h3>
                                            <p className="text-sm font-medium text-gray-600 dark:text-[#f7b2d0]/70">
                                                {member.role}
                                            </p>
                                        </div>
                                    </button>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-24 rounded-[3rem] border border-gray-200 dark:border-[#341525] bg-white dark:bg-[#1a0a12]/40 shadow-sm mx-4">
                                <Users size={48} className="mx-auto mb-4 text-gray-300 dark:text-[#341525]" />
                                <p className="text-xl font-bold text-gray-900 dark:text-white">No members found</p>
                                <p className="text-gray-600 dark:text-gray-400 mt-2">Check back later or select a different department.</p>
                            </div>
                        )}
                    </div>
                )}
            </main>

            <Footer />

            {/* ─── Profile Modal ─── */}
            {selectedMember && (
                <div className="fixed inset-0 z-[100] flex justify-center items-center p-4 sm:p-6 lg:p-8">
                    {/* Backdrop */}
                    <div
                        className="fixed inset-0 bg-[#010101]/70 backdrop-blur-md animate-fade-in"
                        onClick={() => setSelectedMember(null)}
                    ></div>

                    {/* Modal Content */}
                    <div className="relative w-full max-w-4xl max-h-full flex flex-col bg-white dark:bg-[#1a0a12] rounded-[2.5rem] shadow-[0_0_60px_rgba(158,0,255,0.15)] overflow-hidden animate-scale-up z-10">
                        <button
                            onClick={(e) => { e.stopPropagation(); setSelectedMember(null); }}
                            className="absolute top-5 right-5 z-20 w-11 h-11 rounded-full bg-white/60 dark:bg-[#010101]/60 text-gray-900 dark:text-white flex items-center justify-center hover:bg-white dark:hover:bg-[#010101] hover:scale-110 hover:rotate-90 transition-all backdrop-blur-md shadow-lg"
                        >
                            <X size={22} />
                        </button>

                        <div className="flex-1 overflow-y-auto w-full max-h-[85vh] no-scrollbar relative">
                            <div className="flex flex-col md:flex-row min-h-full">
                                {/* Left Visual Column */}
                                <div className="w-full md:w-[45%] h-80 md:h-auto md:min-h-[500px] relative bg-gradient-to-br from-[#f2f5d1] to-[#f7b2d0] dark:from-[#341525] dark:to-[#1a0a12] flex-shrink-0">
                                    {selectedMember.photo_url ? (
                                        <img src={selectedMember.photo_url} alt={selectedMember.name} className="absolute inset-0 w-full h-full object-cover" />
                                    ) : (
                                        <div className="absolute inset-0 flex items-center justify-center text-[10rem] font-black text-[#ea638c]/15 dark:text-[#9e00ff]/10 select-none">
                                            {selectedMember.name.charAt(0)}
                                        </div>
                                    )}
                                    {/* Mobile gradient overlay */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-[#341525]/90 via-[#341525]/20 to-transparent md:hidden pointer-events-none"></div>
                                </div>

                                {/* Right Content Column */}
                                <div className="p-8 md:p-12 w-full flex flex-col bg-white dark:bg-[#1a0a12] relative">
                                    <div className="mb-8">
                                        {selectedMember.department && (
                                            <div className="inline-flex items-center gap-2 mb-4 px-3 py-1.5 rounded-lg bg-[#f2f5d1] dark:bg-[#341525]/60 text-[#7d52a0] dark:text-[#f7b2d0] font-bold uppercase tracking-wider text-xs border border-[#f7b2d0]/30 dark:border-[#341525]">
                                                <Briefcase size={14} className="text-[#9e00ff]" /> {selectedMember.department}
                                            </div>
                                        )}
                                        <h2 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white mb-3 tracking-tight leading-[1.1]">{selectedMember.name}</h2>
                                        <p className="text-xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-[#9e00ff] to-[#ea638c]">{selectedMember.role}</p>
                                    </div>

                                    {/* Badges Row */}
                                    {(selectedMember.age || selectedMember.date_of_birth) && (
                                        <div className="flex flex-wrap gap-4 mb-8">
                                            {selectedMember.age && (
                                                <div className="flex items-center gap-3 px-5 py-3 rounded-2xl bg-[#f2f5d1]/50 dark:bg-[#341525]/40 border border-[#f7b2d0]/20 dark:border-[#341525]/60">
                                                    <div className="text-3xl font-black text-gray-900 dark:text-white">{selectedMember.age}</div>
                                                    <div className="text-xs font-bold text-gray-600 dark:text-[#f7b2d0] uppercase tracking-widest leading-tight">Years<br/>Old</div>
                                                </div>
                                            )}
                                            {selectedMember.date_of_birth && (
                                                <div className="flex items-center gap-3 px-5 py-3 rounded-2xl bg-[#f2f5d1]/50 dark:bg-[#341525]/40 border border-[#f7b2d0]/20 dark:border-[#341525]/60 text-sm font-semibold text-gray-600 dark:text-gray-300">
                                                    <span className="text-xl">🎂</span>
                                                    <span>Born {new Date(selectedMember.date_of_birth).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
                                                </div>
                                            )}
                                        </div>
                                    )}

                                    {/* Bio */}
                                    {selectedMember.description && (
                                        <div className="mb-10">
                                            <p className="text-gray-700 dark:text-gray-300 leading-[1.8] text-base md:text-lg">
                                                {selectedMember.description}
                                            </p>
                                        </div>
                                    )}

                                    {/* Contact & Socials Footer */}
                                    <div className="mt-auto pt-8 border-t border-gray-100 dark:border-[#341525] flex flex-col sm:flex-row gap-6 justify-between items-start sm:items-center">
                                        <div className="flex gap-3">
                                            {selectedMember.contact_email && (
                                                <a href={`mailto:${selectedMember.contact_email}`} className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#f2f5d1]/60 dark:bg-[#341525]/50 text-gray-700 hover:text-[#9e00ff] dark:text-gray-300 dark:hover:text-[#ea638c] hover:bg-[#f7b2d0]/20 dark:hover:bg-[#9e00ff]/10 font-semibold transition-all">
                                                    <Mail size={18} /> Email
                                                </a>
                                            )}
                                            {selectedMember.contact_phone && (
                                                <a href={`tel:${selectedMember.contact_phone}`} className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#f2f5d1]/60 dark:bg-[#341525]/50 text-gray-700 hover:text-[#9e00ff] dark:text-gray-300 dark:hover:text-[#ea638c] hover:bg-[#f7b2d0]/20 dark:hover:bg-[#9e00ff]/10 font-semibold transition-all">
                                                    <Phone size={18} /> Call
                                                </a>
                                            )}
                                        </div>

                                        {selectedMember.social_links && Object.values(selectedMember.social_links).some(Boolean) && (
                                            <div className="flex gap-3">
                                                {selectedMember.social_links.linkedin && (
                                                    <a href={selectedMember.social_links.linkedin} target="_blank" rel="noreferrer" className="w-11 h-11 rounded-full bg-[#f2f5d1] dark:bg-[#341525] border border-[#f7b2d0]/30 dark:border-[#341525] flex items-center justify-center text-[#7d52a0] hover:bg-[#9e00ff] hover:text-white hover:border-[#9e00ff] hover:scale-110 transition-all shadow-sm">
                                                        <Linkedin size={18} />
                                                    </a>
                                                )}
                                                {selectedMember.social_links.twitter && (
                                                    <a href={selectedMember.social_links.twitter} target="_blank" rel="noreferrer" className="w-11 h-11 rounded-full bg-[#f2f5d1] dark:bg-[#341525] border border-[#f7b2d0]/30 dark:border-[#341525] flex items-center justify-center text-[#7d52a0] hover:bg-[#ea638c] hover:text-white hover:border-[#ea638c] hover:scale-110 transition-all shadow-sm">
                                                        <Twitter size={18} />
                                                    </a>
                                                )}
                                                {selectedMember.social_links.instagram && (
                                                    <a href={selectedMember.social_links.instagram} target="_blank" rel="noreferrer" className="w-11 h-11 rounded-full bg-[#f2f5d1] dark:bg-[#341525] border border-[#f7b2d0]/30 dark:border-[#341525] flex items-center justify-center text-[#7d52a0] hover:bg-[#f89d61] hover:text-white hover:border-[#f89d61] hover:scale-110 transition-all shadow-sm">
                                                        <Instagram size={18} />
                                                    </a>
                                                )}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Team;
